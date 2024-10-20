import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePasswordDTO {
  @ApiProperty({ type: String, format: 'password', description: '현재 비밀번호' })
  @IsString()
  @IsNotEmpty()
  currentPassword: string;

  @ApiProperty({ type: String, format: 'password', description: '새 비밀번호' })
  @IsString()
  @IsNotEmpty()
  newPassword: string;

  @ApiProperty({ type: String, format: 'password', description: '새 비밀번호 확인' })
  @IsString()
  @IsNotEmpty()
  confirmPassword: string;
}
