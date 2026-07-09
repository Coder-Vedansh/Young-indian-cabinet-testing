import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MembersModule } from './members/members.module';
import { CommitteesModule } from './committees/committees.module';
import { MeetingsModule } from './meetings/meetings.module';
import { EventsModule } from './events/events.module';
import { ChatModule } from './chat/chat.module';
import { NotificationsModule } from './notifications/notifications.module';
import { PoliciesModule } from './policies/policies.module';
import { VotingModule } from './voting/voting.module';
import { LearningModule } from './learning/learning.module';
import { CertificatesModule } from './certificates/certificates.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { FilesModule } from './files/files.module';
import { AdministrationModule } from './administration/administration.module';
import { CommonModule } from './common/common.module';
import { ApplicationsModule } from './applications/applications.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 100, // 100 requests per minute by default
    }]),
    AuthModule,
    UsersModule,
    MembersModule,
    CommitteesModule,
    MeetingsModule,
    EventsModule,
    ChatModule,
    NotificationsModule,
    PoliciesModule,
    VotingModule,
    LearningModule,
    CertificatesModule,
    AnalyticsModule,
    FilesModule,
    AdministrationModule,
    CommonModule,
    ApplicationsModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
