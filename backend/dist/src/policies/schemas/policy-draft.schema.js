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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PolicyDraftSchema = exports.PolicyDraft = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let PolicyDraft = class PolicyDraft {
    title;
    content;
    authorId;
    collaboratorIds;
    status;
    metadata;
};
exports.PolicyDraft = PolicyDraft;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], PolicyDraft.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], PolicyDraft.prototype, "content", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], PolicyDraft.prototype, "authorId", void 0);
__decorate([
    (0, mongoose_1.Prop)([String]),
    __metadata("design:type", Array)
], PolicyDraft.prototype, "collaboratorIds", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'DRAFT' }),
    __metadata("design:type", String)
], PolicyDraft.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object }),
    __metadata("design:type", Object)
], PolicyDraft.prototype, "metadata", void 0);
exports.PolicyDraft = PolicyDraft = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], PolicyDraft);
exports.PolicyDraftSchema = mongoose_1.SchemaFactory.createForClass(PolicyDraft);
//# sourceMappingURL=policy-draft.schema.js.map