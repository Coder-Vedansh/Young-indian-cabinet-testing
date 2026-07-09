import { Module, Global } from '@nestjs/common';
import { EmailService, EMAIL_PROVIDER } from './services/email.service';
import { NodemailerProvider } from './providers/nodemailer.provider';
import { PrismaService } from './services/prisma.service';

@Global()
@Module({
  providers: [
    PrismaService,
    EmailService,
    {
      provide: EMAIL_PROVIDER,
      useClass: NodemailerProvider,
    },
  ],
  exports: [PrismaService, EmailService],
})
export class CommonModule {}
