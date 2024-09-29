import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDTO {
  @ApiProperty({ type: String, format: 'email', description: '이메일' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ type: String, format: 'password', description: '비밀번호' })
  @IsNotEmpty()
  password: string;
}
