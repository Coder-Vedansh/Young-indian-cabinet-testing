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
exports.ApplicationsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/services/prisma.service");
let ApplicationsService = class ApplicationsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, createDto) {
        const existing = await this.prisma.application.findFirst({
            where: { userId, status: { notIn: ['REJECTED'] } }
        });
        if (existing) {
            throw new common_1.ConflictException('You already have an active application.');
        }
        const applicationNo = `YA-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
        return this.prisma.application.create({
            data: {
                userId,
                applicationNo,
                ...createDto,
            },
        });
    }
    async findAll() {
        return this.prisma.application.findMany({
            include: { user: { select: { email: true } } },
            orderBy: { createdAt: 'desc' }
        });
    }
    async findOne(id) {
        const application = await this.prisma.application.findUnique({
            where: { id },
            include: { user: { select: { email: true } } }
        });
        if (!application)
            throw new common_1.NotFoundException('Application not found');
        return application;
    }
    async findByUserId(userId) {
        return this.prisma.application.findFirst({
            where: { userId },
            orderBy: { createdAt: 'desc' }
        });
    }
    async updateStatus(id, updateDto) {
        const application = await this.prisma.application.findUnique({ where: { id } });
        if (!application)
            throw new common_1.NotFoundException('Application not found');
        const updated = await this.prisma.application.update({
            where: { id },
            data: { status: updateDto.status },
        });
        if (updateDto.status === 'APPROVED') {
            const memberRole = await this.prisma.role.findUnique({ where: { name: 'MEMBER' } });
            if (memberRole) {
                await this.prisma.userRole.upsert({
                    where: { userId_roleId: { userId: application.userId, roleId: memberRole.id } },
                    create: { userId: application.userId, roleId: memberRole.id },
                    update: {}
                });
            }
            const user = await this.prisma.user.findUnique({ where: { id: application.userId } });
            if (!user.membershipNumber) {
                const memNo = `YAM-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
                await this.prisma.user.update({
                    where: { id: application.userId },
                    data: { membershipNumber: memNo }
                });
            }
            if (updateDto.assignedCommitteeId) {
                await this.prisma.membership.upsert({
                    where: { userId_committeeId: { userId: application.userId, committeeId: updateDto.assignedCommitteeId } },
                    create: { userId: application.userId, committeeId: updateDto.assignedCommitteeId, roleInCommittee: 'MEMBER' },
                    update: {}
                });
            }
        }
        return updated;
    }
};
exports.ApplicationsService = ApplicationsService;
exports.ApplicationsService = ApplicationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ApplicationsService);
//# sourceMappingURL=applications.service.js.map