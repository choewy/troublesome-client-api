import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdatePasswordDTO {
  @ApiProperty({ type: String, format: 'password' })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  currentPassword: string;

  @ApiProperty({ type: String, format: 'password' })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  newPassword: string;

  @ApiProperty({ type: String, format: 'password' })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  confirmPassword: string;
}
