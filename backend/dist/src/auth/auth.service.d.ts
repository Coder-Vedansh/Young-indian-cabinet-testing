import { PrismaService } from '../common/services/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from '../common/services/email.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    private readonly emailService;
    constructor(prisma: PrismaService, jwtService: JwtService, emailService: EmailService);
    register(registerDto: RegisterDto): Promise<{
        message: string;
    }>;
    verifyEmail(verifyOtpDto: VerifyOtpDto): Promise<{
        message: string;
    }>;
    login(loginDto: LoginDto, ipAddress?: string, deviceInfo?: string): Promise<{
        accessToken: string;
        refreshToken: any;
    }>;
    logout(userId: string): Promise<{
        message: string;
    }>;
    refresh(refreshTokenStr: string, ipAddress?: string, deviceInfo?: string): Promise<void>;
}
