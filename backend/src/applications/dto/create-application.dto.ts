import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateApplicationDto {
  // Step 1
  @ApiProperty() @IsString() @IsNotEmpty() fullName: string;
  @ApiProperty() @IsString() @IsNotEmpty() fatherName: string;
  @ApiProperty() @IsString() @IsNotEmpty() motherName: string;
  @ApiProperty() @IsString() @IsNotEmpty() gender: string;
  @ApiProperty() @IsDateString() @IsNotEmpty() dob: string;
  @ApiProperty() @IsString() @IsNotEmpty() nationality: string;
  @ApiProperty({ required: false }) @IsString() @IsOptional() profilePhotoUrl?: string;

  // Step 2
  @ApiProperty() @IsString() @IsNotEmpty() mobileNumber: string;
  @ApiProperty({ required: false }) @IsString() @IsOptional() altMobileNumber?: string;

  // Step 3
  @ApiProperty() @IsString() @IsNotEmpty() country: string;
  @ApiProperty() @IsString() @IsNotEmpty() state: string;
  @ApiProperty() @IsString() @IsNotEmpty() district: string;
  @ApiProperty() @IsString() @IsNotEmpty() city: string;
  @ApiProperty() @IsString() @IsNotEmpty() pincode: string;
  @ApiProperty() @IsString() @IsNotEmpty() fullAddress: string;

  // Step 4
  @ApiProperty() @IsString() @IsNotEmpty() occupation: string;
  @ApiProperty({ required: false }) @IsString() @IsOptional() organization?: string;
  @ApiProperty() @IsString() @IsNotEmpty() qualification: string;
  @ApiProperty({ required: false }) @IsString() @IsOptional() skills?: string;
  @ApiProperty({ required: false }) @IsString() @IsOptional() areasOfInterest?: string;
  @ApiProperty({ required: false }) @IsString() @IsOptional() volunteerExp?: string;

  // Step 5
  @ApiProperty({ required: false }) @IsString() @IsOptional() preferredStateId?: string;
  @ApiProperty({ required: false }) @IsString() @IsOptional() preferredDistrictId?: string;
  @ApiProperty({ required: false }) @IsString() @IsOptional() preferredCommitteeId?: string;
  @ApiProperty({ required: false }) @IsString() @IsOptional() reasonForJoining?: string;
  @ApiProperty({ required: false }) @IsString() @IsOptional() shortBio?: string;

  // Step 6
  @ApiProperty({ required: false }) @IsString() @IsOptional() passportPhotoUrl?: string;
  @ApiProperty({ required: false }) @IsString() @IsOptional() govtIdUrl?: string;
  @ApiProperty({ required: false }) @IsString() @IsOptional() collegeIdUrl?: string;
  @ApiProperty({ required: false }) @IsString() @IsOptional() resumeUrl?: string;

  // Step 7
  @ApiProperty() @IsBoolean() @IsNotEmpty() acceptedTerms: boolean;
  @ApiProperty() @IsBoolean() @IsNotEmpty() acceptedCode: boolean;
  @ApiProperty() @IsBoolean() @IsNotEmpty() acceptedPrivacy: boolean;
}
