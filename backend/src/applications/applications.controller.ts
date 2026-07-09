import { Controller, Get, Post, Body, Patch, Param, UseGuards, Req } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationStatusDto } from './dto/update-application-status.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { ApiTags, ApiCookieAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('Applications')
@Controller('applications')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiCookieAuth()
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Post()
  @ApiOperation({ summary: 'Submit a new Youth Assembly Application (Step 7 completion)' })
  create(@Req() req: any, @Body() createDto: CreateApplicationDto) {
    return this.applicationsService.create(req.user.id, createDto);
  }

  @Get('me')
  @ApiOperation({ summary: 'Get current user application status' })
  findMyApplication(@Req() req: any) {
    return this.applicationsService.findByUserId(req.user.id);
  }

  @Get()
  @Roles('ADMINISTRATOR')
  @ApiOperation({ summary: 'Admin: Get all applications' })
  findAll() {
    return this.applicationsService.findAll();
  }

  @Get(':id')
  @Roles('ADMINISTRATOR')
  @ApiOperation({ summary: 'Admin: Get specific application details' })
  findOne(@Param('id') id: string) {
    return this.applicationsService.findOne(id);
  }

  @Patch(':id/status')
  @Roles('ADMINISTRATOR')
  @ApiOperation({ summary: 'Admin: Approve/Reject/Assign application' })
  updateStatus(@Param('id') id: string, @Body() updateDto: UpdateApplicationStatusDto) {
    return this.applicationsService.updateStatus(id, updateDto);
  }
}
