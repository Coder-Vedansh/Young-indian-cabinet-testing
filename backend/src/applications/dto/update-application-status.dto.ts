import { IsString, IsNotEmpty, IsOptional, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateApplicationStatusDto {
  @ApiProperty({ description: 'The new status' })
  @IsString()
  @IsNotEmpty()
  @IsIn(['UNDER_REVIEW', 'APPROVED', 'REJECTED', 'MORE_INFO'])
  status: string;

  @ApiProperty({ required: false, description: 'Optional feedback for REJECTED or MORE_INFO' })
  @IsString()
  @IsOptional()
  feedback?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  assignedStateId?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  assignedDistrictId?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  assignedCommitteeId?: string;
}
