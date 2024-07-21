import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDTO {
  @ApiProperty({ type: String, description: '아이디' })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  account: string;

  @ApiProperty({ type: String, description: '비밀번호' })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  password: string;
}
