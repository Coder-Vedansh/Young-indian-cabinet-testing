import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../common/services/prisma.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationStatusDto } from './dto/update-application-status.dto';

@Injectable()
export class ApplicationsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, createDto: CreateApplicationDto) {
    const existing = await this.prisma.application.findFirst({
      where: { userId, status: { notIn: ['REJECTED'] } }
    });
    if (existing) {
      throw new ConflictException('You already have an active application.');
    }

    // Generate a random application number (MVP logic)
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

  async findOne(id: string) {
    const application = await this.prisma.application.findUnique({
      where: { id },
      include: { user: { select: { email: true } } }
    });
    if (!application) throw new NotFoundException('Application not found');
    return application;
  }

  async findByUserId(userId: string) {
    return this.prisma.application.findFirst({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });
  }

  async updateStatus(id: string, updateDto: UpdateApplicationStatusDto) {
    const application = await this.prisma.application.findUnique({ where: { id } });
    if (!application) throw new NotFoundException('Application not found');

    const updated = await this.prisma.application.update({
      where: { id },
      data: { status: updateDto.status },
    });

    // If approved, handle MVP assignments
    if (updateDto.status === 'APPROVED') {
      const memberRole = await this.prisma.role.findUnique({ where: { name: 'MEMBER' } });
      if (memberRole) {
        // Upgrade Role
        await this.prisma.userRole.upsert({
          where: { userId_roleId: { userId: application.userId, roleId: memberRole.id } },
          create: { userId: application.userId, roleId: memberRole.id },
          update: {}
        });
      }

      // Generate Membership ID if not exists
      const user = await this.prisma.user.findUnique({ where: { id: application.userId } });
      if (!user.membershipNumber) {
        const memNo = `YAM-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
        await this.prisma.user.update({
          where: { id: application.userId },
          data: { membershipNumber: memNo }
        });
      }

      // Add to Committee if assigned
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
}
