import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDTO {
  @ApiProperty({ type: String, format: 'email' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: String, format: 'password' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ type: String, format: 'password' })
  @IsString()
  @IsNotEmpty()
  confirmPassword: string;
}
