"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const members_module_1 = require("./members/members.module");
const committees_module_1 = require("./committees/committees.module");
const meetings_module_1 = require("./meetings/meetings.module");
const events_module_1 = require("./events/events.module");
const chat_module_1 = require("./chat/chat.module");
const notifications_module_1 = require("./notifications/notifications.module");
const policies_module_1 = require("./policies/policies.module");
const voting_module_1 = require("./voting/voting.module");
const learning_module_1 = require("./learning/learning.module");
const certificates_module_1 = require("./certificates/certificates.module");
const analytics_module_1 = require("./analytics/analytics.module");
const files_module_1 = require("./files/files.module");
const administration_module_1 = require("./administration/administration.module");
const common_module_1 = require("./common/common.module");
const applications_module_1 = require("./applications/applications.module");
const throttler_1 = require("@nestjs/throttler");
const core_1 = require("@nestjs/core");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            throttler_1.ThrottlerModule.forRoot([{
                    ttl: 60000,
                    limit: 100,
                }]),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            members_module_1.MembersModule,
            committees_module_1.CommitteesModule,
            meetings_module_1.MeetingsModule,
            events_module_1.EventsModule,
            chat_module_1.ChatModule,
            notifications_module_1.NotificationsModule,
            policies_module_1.PoliciesModule,
            voting_module_1.VotingModule,
            learning_module_1.LearningModule,
            certificates_module_1.CertificatesModule,
            analytics_module_1.AnalyticsModule,
            files_module_1.FilesModule,
            administration_module_1.AdministrationModule,
            common_module_1.CommonModule,
            applications_module_1.ApplicationsModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_1.ThrottlerGuard,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map