"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/services/prisma.service");
const jwt_1 = require("@nestjs/jwt");
const email_service_1 = require("../common/services/email.service");
const bcrypt = __importStar(require("bcrypt"));
const reset_password_dto_1 = require("./dto/reset-password.dto");
let AuthService = class AuthService {
    prisma;
    jwtService;
    emailService;
    constructor(prisma, jwtService, emailService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.emailService = emailService;
    }
    async register(registerDto) {
        const existingUser = await this.prisma.user.findUnique({
            where: { email: registerDto.email },
        });
        if (existingUser) {
            throw new common_1.ConflictException('Email already in use');
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
        let guestRole = await this.prisma.role.findUnique({ where: { name: 'GUEST' } });
        if (!guestRole) {
            guestRole = await this.prisma.role.create({ data: { name: 'GUEST' } });
        }
        await this.prisma.userRole.create({
            data: { userId: user.id, roleId: guestRole.id },
        });
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpHash = await bcrypt.hash(otp, 10);
        const expiresAt = new Date(Date.now() + 15 * 60 * 1000);
        await this.prisma.otp.create({
            data: {
                userId: user.id,
                otpHash,
                type: 'EMAIL_VERIFICATION',
                expiresAt,
            },
        });
        await this.emailService.sendOtp(user.email, otp, 'verification');
        return { message: 'Registration successful. Please check your email for the verification code.' };
    }
    async verifyEmail(verifyOtpDto) {
        const user = await this.prisma.user.findUnique({ where: { email: verifyOtpDto.email } });
        if (!user)
            throw new common_1.BadRequestException('Invalid email');
        const otpRecord = await this.prisma.otp.findFirst({
            where: {
                userId: user.id,
                type: 'EMAIL_VERIFICATION',
                isUsed: false,
                expiresAt: { gt: new Date() },
            },
            orderBy: { createdAt: 'desc' },
        });
        if (!otpRecord)
            throw new common_1.BadRequestException('Invalid or expired OTP');
        const isValid = await bcrypt.compare(verifyOtpDto.otp, otpRecord.otpHash);
        if (!isValid)
            throw new common_1.BadRequestException('Invalid OTP');
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
    async login(loginDto, ipAddress, deviceInfo) {
        const user = await this.prisma.user.findUnique({ where: { email: loginDto.email } });
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        if (user.lockedUntil && user.lockedUntil > new Date()) {
            throw new common_1.UnauthorizedException('Account locked. Try again later.');
        }
        if (!user.isEmailVerified) {
            throw new common_1.UnauthorizedException('Please verify your email before logging in.');
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
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        await this.prisma.user.update({
            where: { id: user.id },
            data: { failedLoginAttempts: 0, lockedUntil: null },
        });
        const accessToken = this.jwtService.sign({ sub: user.id, email: user.email });
        const crypto = require('crypto');
        const refreshTokenPlain = crypto.randomBytes(40).toString('hex');
        const refreshTokenHash = crypto.createHash('sha256').update(refreshTokenPlain).digest('hex');
        const refreshExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        await this.prisma.refreshToken.create({
            data: {
                userId: user.id,
                tokenHash: refreshTokenHash,
                ipAddress,
                deviceInfo,
                expiresAt: refreshExpiresAt,
            },
        });
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
    async logout(userId) {
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
    async refresh(refreshTokenStr, ipAddress, deviceInfo) {
        if (!refreshTokenStr)
            throw new common_1.UnauthorizedException('Refresh token missing');
        const crypto = require('crypto');
        const hash = crypto.createHash('sha256').update(refreshTokenStr).digest('hex');
        const tokenRecord = await this.prisma.refreshToken.findFirst({
            where: { tokenHash: hash },
            include: { user: true },
        });
        if (!tokenRecord) {
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
        if (tokenRecord.isRevoked) {
            await this.prisma.refreshToken.updateMany({
                where: { userId: tokenRecord.userId },
                data: { isRevoked: true },
            });
            throw new common_1.UnauthorizedException('Token has been revoked. Security action triggered.');
        }
        if (tokenRecord.expiresAt < new Date()) {
            throw new common_1.UnauthorizedException('Refresh token expired');
        }
        await this.prisma.refreshToken.update({
            where: { id: tokenRecord.id },
            data: { isRevoked: true },
        });
        const user = tokenRecord.user;
        if (!user.isActive || (user.lockedUntil && user.lockedUntil > new Date())) {
            throw new common_1.UnauthorizedException('User account is inactive or locked');
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
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            },
            return: { accessToken: newAccessToken, refreshToken: newRefreshTokenPlain }
        }, async, forgotPassword(forgotPasswordDto, { email: string }), {
            const: user = await this.prisma.user.findUnique({ where: { email: forgotPasswordDto.email } }),
            if(, user) {
                return { message: 'If that email exists, a reset link has been sent.' };
            },
            const: otp = Math.floor(100000 + Math.random() * 900000).toString(),
            const: otpHash = await bcrypt.hash(otp, 10),
            const: expiresAt = new Date(Date.now() + 15 * 60 * 1000),
            await: this.prisma.otp.create({
                data: {
                    userId: user.id,
                    otpHash,
                    type: 'PASSWORD_RESET',
                    expiresAt,
                },
            }),
            await: this.emailService.sendOtp(user.email, otp, 'password_reset'),
            return: { message: 'If that email exists, a reset link has been sent.' }
        }, async, resetPassword(resetPasswordDto, reset_password_dto_1.ResetPasswordDto), {
            const: user = await this.prisma.user.findUnique({ where: { email: resetPasswordDto.email } }),
            if(, user) { }, throw: new common_1.BadRequestException('Invalid request'),
            const: otpRecord = await this.prisma.otp.findFirst({
                where: {
                    userId: user.id,
                    type: 'PASSWORD_RESET',
                    isUsed: false,
                    expiresAt: { gt: new Date() },
                },
                orderBy: { createdAt: 'desc' },
            }),
            if(, otpRecord) { }, throw: new common_1.BadRequestException('Invalid or expired OTP'),
            const: isValid = await bcrypt.compare(resetPasswordDto.otp, otpRecord.otpHash),
            if(, isValid) { }, throw: new common_1.BadRequestException('Invalid OTP'),
            const: isSamePassword = await bcrypt.compare(resetPasswordDto.newPassword, user.passwordHash || ''),
            if(isSamePassword) {
                throw new common_1.BadRequestException('New password must be different from current password');
            },
            const: newPasswordHash = await bcrypt.hash(resetPasswordDto.newPassword, 12),
            await: this.prisma.user.update({
                where: { id: user.id },
                data: { passwordHash: newPasswordHash },
            }),
            await: this.prisma.otp.update({
                where: { id: otpRecord.id },
                data: { isUsed: true },
            }),
            await: this.prisma.session.updateMany({
                where: { userId: user.id },
                data: { isActive: false },
            }),
            await: this.prisma.refreshToken.updateMany({
                where: { userId: user.id },
                data: { isRevoked: true },
            }),
            return: { message: 'Password successfully reset' }
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        email_service_1.EmailService])
], AuthService);
//# sourceMappingURL=auth.service.js.map