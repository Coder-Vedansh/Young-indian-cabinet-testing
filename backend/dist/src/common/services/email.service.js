"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = exports.EMAIL_PROVIDER = void 0;
const common_1 = require("@nestjs/common");
exports.EMAIL_PROVIDER = 'EMAIL_PROVIDER';
let EmailService = class EmailService {
    emailProvider;
    constructor(emailProvider) {
        this.emailProvider = emailProvider;
    }
    async sendWelcome(to, name) {
        const html = `
      <h1>Welcome to the Youth Assembly, ${name}!</h1>
      <p>We are thrilled to have you join our platform.</p>
    `;
        await this.emailProvider.sendEmail({ to, subject: 'Welcome to Youth Assembly!', html });
    }
    async sendOtp(to, otp, context) {
        const action = context === 'verification' ? 'verify your email' : 'reset your password';
        const html = `
      <h1>Verification Code</h1>
      <p>Use the following code to ${action}:</p>
      <h2>${otp}</h2>
      <p>This code will expire in 15 minutes.</p>
    `;
        await this.emailProvider.sendEmail({ to, subject: 'Your Verification Code', html });
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(exports.EMAIL_PROVIDER)),
    __metadata("design:paramtypes", [Object])
], EmailService);
//# sourceMappingURL=email.service.js.map