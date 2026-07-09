import { EmailProvider, SendEmailOptions } from '../interfaces/email-provider.interface';
export declare class NodemailerProvider implements EmailProvider {
    private transporter;
    private readonly logger;
    constructor();
    sendEmail(options: SendEmailOptions): Promise<void>;
}
