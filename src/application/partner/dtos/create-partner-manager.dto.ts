import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreatePartnerManagerDTO {
  @ApiProperty({ type: String, format: 'email', description: '이메일' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ type: String, format: 'password', description: '비밀번호' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ type: String, format: 'password', description: '비밀번호 확인' })
  @IsString()
  @IsNotEmpty()
  confirmPassword: string;

  @ApiProperty({ type: String, description: '이름' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
