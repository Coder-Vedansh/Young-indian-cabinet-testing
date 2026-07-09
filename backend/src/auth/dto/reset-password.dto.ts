import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  otp: string;

  @ApiProperty({ description: 'Must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character' })
  @IsString()
  @MinLength(8)
  @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/, {
    message: 'Password is too weak. Must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.',
  })
  newPassword: string;
}
