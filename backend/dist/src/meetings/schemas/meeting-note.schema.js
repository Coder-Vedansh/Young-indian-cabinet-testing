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
exports.MeetingNoteSchema = exports.MeetingNote = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let MeetingNote = class MeetingNote {
    meetingId;
    content;
    actionItems;
    aiSummary;
    authorId;
};
exports.MeetingNote = MeetingNote;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], MeetingNote.prototype, "meetingId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], MeetingNote.prototype, "content", void 0);
__decorate([
    (0, mongoose_1.Prop)([String]),
    __metadata("design:type", Array)
], MeetingNote.prototype, "actionItems", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], MeetingNote.prototype, "aiSummary", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], MeetingNote.prototype, "authorId", void 0);
exports.MeetingNote = MeetingNote = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], MeetingNote);
exports.MeetingNoteSchema = mongoose_1.SchemaFactory.createForClass(MeetingNote);
//# sourceMappingURL=meeting-note.schema.js.map