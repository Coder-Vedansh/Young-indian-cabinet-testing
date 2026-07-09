import { EmailProvider } from '../interfaces/email-provider.interface';
export declare const EMAIL_PROVIDER = "EMAIL_PROVIDER";
export declare class EmailService {
    private readonly emailProvider;
    constructor(emailProvider: EmailProvider);
    sendWelcome(to: string, name: string): Promise<void>;
    sendOtp(to: string, otp: string, context: 'verification' | 'password_reset'): Promise<void>;
}
