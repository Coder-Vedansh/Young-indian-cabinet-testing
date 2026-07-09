import { Injectable, Logger } from '@nestjs/common';
import { EmailProvider, SendEmailOptions } from '../interfaces/email-provider.interface';
import * as nodemailer from 'nodemailer';

@Injectable()
export class NodemailerProvider implements EmailProvider {
  private transporter: nodemailer.Transporter;
  private readonly logger = new Logger(NodemailerProvider.name);

  constructor() {
    // Ethereal Email configuration for local development
    this.transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: process.env.ETHEREAL_USER || 'ethereal.user@ethereal.email',
        pass: process.env.ETHEREAL_PASS || 'ethereal_password',
      },
    });
  }

  async sendEmail(options: SendEmailOptions): Promise<void> {
    try {
      const info = await this.transporter.sendMail({
        from: '"Youth Assembly" <noreply@youthassembly.org>',
        to: options.to,
        subject: options.subject,
        html: options.html,
      });

      this.logger.log(`Message sent: ${info.messageId}`);
      this.logger.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
    } catch (error) {
      this.logger.error(`Failed to send email to ${options.to}`, error);
      throw error;
    }
  }
}
