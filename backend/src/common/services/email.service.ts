import { Injectable, Inject } from '@nestjs/common';
import { EmailProvider } from '../interfaces/email-provider.interface';

export const EMAIL_PROVIDER = 'EMAIL_PROVIDER';

@Injectable()
export class EmailService {
  constructor(@Inject(EMAIL_PROVIDER) private readonly emailProvider: EmailProvider) {}

  async sendWelcome(to: string, name: string): Promise<void> {
    const html = `
      <h1>Welcome to the Youth Assembly, ${name}!</h1>
      <p>We are thrilled to have you join our platform.</p>
    `;
    await this.emailProvider.sendEmail({ to, subject: 'Welcome to Youth Assembly!', html });
  }

  async sendOtp(to: string, otp: string, context: 'verification' | 'password_reset'): Promise<void> {
    const action = context === 'verification' ? 'verify your email' : 'reset your password';
    const html = `
      <h1>Verification Code</h1>
      <p>Use the following code to ${action}:</p>
      <h2>${otp}</h2>
      <p>This code will expire in 15 minutes.</p>
    `;
    await this.emailProvider.sendEmail({ to, subject: 'Your Verification Code', html });
  }
}
