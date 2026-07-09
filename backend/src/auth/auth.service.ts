import { Injectable, UnauthorizedException, BadRequestException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../common/services/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from '../common/services/email.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
  ) {}

  async register(registerDto: RegisterDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: registerDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    const passwordHash = await bcrypt.hash(registerDto.password, 12);

    const user = await this.prisma.user.create({
      data: {
        email: registerDto.email,
        passwordHash,
        firstName: registerDto.firstName,
        lastName: registerDto.lastName,
      },
    });

    // Assign default GUEST role
    let guestRole = await this.prisma.role.findUnique({ where: { name: 'GUEST' } });
    if (!guestRole) {
      guestRole = await this.prisma.role.create({ data: { name: 'GUEST' } });
    }

    await this.prisma.userRole.create({
      data: { userId: user.id, roleId: guestRole.id },
    });

    // Generate OTP for email verification
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpHash = await bcrypt.hash(otp, 10);
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 mins

    await this.prisma.otp.create({
      data: {
        userId: user.id,
        otpHash,
        type: 'EMAIL_VERIFICATION',
        expiresAt,
      },
    });

    // Send email
    await this.emailService.sendOtp(user.email, otp, 'verification');

    return { message: 'Registration successful. Please check your email for the verification code.' };
  }

  async verifyEmail(verifyOtpDto: VerifyOtpDto) {
    const user = await this.prisma.user.findUnique({ where: { email: verifyOtpDto.email } });
    if (!user) throw new BadRequestException('Invalid email');

    const otpRecord = await this.prisma.otp.findFirst({
      where: {
        userId: user.id,
        type: 'EMAIL_VERIFICATION',
        isUsed: false,
        expiresAt: { gt: new Date() },
      },
      orderBy: { createdAt: 'desc' },
    });

    if (!otpRecord) throw new BadRequestException('Invalid or expired OTP');

    const isValid = await bcrypt.compare(verifyOtpDto.otp, otpRecord.otpHash);
    if (!isValid) throw new BadRequestException('Invalid OTP');

    await this.prisma.otp.update({
      where: { id: otpRecord.id },
      data: { isUsed: true },
    });

    await this.prisma.user.update({
      where: { id: user.id },
      data: { isEmailVerified: true },
    });

    await this.emailService.sendWelcome(user.email, user.firstName);

    return { message: 'Email successfully verified' };
  }

  async login(loginDto: LoginDto, ipAddress?: string, deviceInfo?: string) {
    const user = await this.prisma.user.findUnique({ where: { email: loginDto.email } });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (user.lockedUntil && user.lockedUntil > new Date()) {
      throw new UnauthorizedException('Account locked. Try again later.');
    }

    if (!user.isEmailVerified) {
      throw new UnauthorizedException('Please verify your email before logging in.');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.passwordHash || '');
    if (!isPasswordValid) {
      await this.prisma.user.update({
        where: { id: user.id },
        data: {
          failedLoginAttempts: { increment: 1 },
          lockedUntil: user.failedLoginAttempts >= 4 ? new Date(Date.now() + 15 * 60 * 1000) : null,
        },
      });
      throw new UnauthorizedException('Invalid credentials');
    }

    // Reset failed attempts
    await this.prisma.user.update({
      where: { id: user.id },
      data: { failedLoginAttempts: 0, lockedUntil: null },
    });

    const accessToken = this.jwtService.sign({ sub: user.id, email: user.email });
    
    // Refresh token
    const crypto = require('crypto');
    const refreshTokenPlain = crypto.randomBytes(40).toString('hex');
    const refreshTokenHash = crypto.createHash('sha256').update(refreshTokenPlain).digest('hex');
    const refreshExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    await this.prisma.refreshToken.create({
      data: {
        userId: user.id,
        tokenHash: refreshTokenHash,
        ipAddress,
        deviceInfo,
        expiresAt: refreshExpiresAt,
      },
    });

    // Session
    await this.prisma.session.create({
      data: {
        userId: user.id,
        ipAddress,
        deviceInfo,
        expiresAt: refreshExpiresAt,
      },
    });

    return { accessToken, refreshToken: refreshTokenPlain };
  }

  async logout(userId: string) {
    await this.prisma.session.updateMany({
      where: { userId },
      data: { isActive: false },
    });
    
    await this.prisma.refreshToken.updateMany({
        where: { userId },
        data: { isRevoked: true },
    });
    return { message: 'Logged out successfully' };
  }

  async refresh(refreshTokenStr: string, ipAddress?: string, deviceInfo?: string) {
    if (!refreshTokenStr) throw new UnauthorizedException('Refresh token missing');

    const crypto = require('crypto');
    const hash = crypto.createHash('sha256').update(refreshTokenStr).digest('hex');

    const tokenRecord = await this.prisma.refreshToken.findFirst({
      where: { tokenHash: hash },
      include: { user: true },
    });

    if (!tokenRecord) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    if (tokenRecord.isRevoked) {
      // Security breach detected: someone used a revoked token. Revoke ALL tokens for this user.
      await this.prisma.refreshToken.updateMany({
        where: { userId: tokenRecord.userId },
        data: { isRevoked: true },
      });
      throw new UnauthorizedException('Token has been revoked. Security action triggered.');
    }

    if (tokenRecord.expiresAt < new Date()) {
      throw new UnauthorizedException('Refresh token expired');
    }

    // Token Rotation: Revoke the old token and generate a new one
    await this.prisma.refreshToken.update({
      where: { id: tokenRecord.id },
      data: { isRevoked: true },
    });

    const user = tokenRecord.user;
    if (!user.isActive || (user.lockedUntil && user.lockedUntil > new Date())) {
      throw new UnauthorizedException('User account is inactive or locked');
    }

    const newAccessToken = this.jwtService.sign({ sub: user.id, email: user.email });
    const newRefreshTokenPlain = crypto.randomBytes(40).toString('hex');
    const newRefreshTokenHash = crypto.createHash('sha256').update(newRefreshTokenPlain).digest('hex');

    await this.prisma.refreshToken.create({
      data: {
        userId: user.id,
        tokenHash: newRefreshTokenHash,
        ipAddress,
        deviceInfo,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Extends expiration
      },
    return { accessToken: newAccessToken, refreshToken: newRefreshTokenPlain };
  }

  async forgotPassword(forgotPasswordDto: { email: string }) {
    const user = await this.prisma.user.findUnique({ where: { email: forgotPasswordDto.email } });
    if (!user) {
      // Return generic message to prevent email enumeration
      return { message: 'If that email exists, a reset link has been sent.' };
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpHash = await bcrypt.hash(otp, 10);
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 mins

    await this.prisma.otp.create({
      data: {
        userId: user.id,
        otpHash,
        type: 'PASSWORD_RESET',
        expiresAt,
      },
    });

    await this.emailService.sendOtp(user.email, otp, 'password_reset');

    return { message: 'If that email exists, a reset link has been sent.' };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const user = await this.prisma.user.findUnique({ where: { email: resetPasswordDto.email } });
    if (!user) throw new BadRequestException('Invalid request');

    const otpRecord = await this.prisma.otp.findFirst({
      where: {
        userId: user.id,
        type: 'PASSWORD_RESET',
        isUsed: false,
        expiresAt: { gt: new Date() },
      },
      orderBy: { createdAt: 'desc' },
    });

    if (!otpRecord) throw new BadRequestException('Invalid or expired OTP');

    const isValid = await bcrypt.compare(resetPasswordDto.otp, otpRecord.otpHash);
    if (!isValid) throw new BadRequestException('Invalid OTP');

    // Prevent password reuse (basic check)
    const isSamePassword = await bcrypt.compare(resetPasswordDto.newPassword, user.passwordHash || '');
    if (isSamePassword) {
      throw new BadRequestException('New password must be different from current password');
    }

    const newPasswordHash = await bcrypt.hash(resetPasswordDto.newPassword, 12);

    await this.prisma.user.update({
      where: { id: user.id },
      data: { passwordHash: newPasswordHash },
    });

    await this.prisma.otp.update({
      where: { id: otpRecord.id },
      data: { isUsed: true },
    });

    // Revoke all existing sessions and refresh tokens for security
    await this.prisma.session.updateMany({
      where: { userId: user.id },
      data: { isActive: false },
    });
    await this.prisma.refreshToken.updateMany({
      where: { userId: user.id },
      data: { isRevoked: true },
    });

    return { message: 'Password successfully reset' };
  }
}
