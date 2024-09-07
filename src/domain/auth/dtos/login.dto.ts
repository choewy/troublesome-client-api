import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDTO {
  @ApiProperty({ type: String, description: '이메일' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ type: String, description: '비밀번호' })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  password: string;
}
