import { EmptyStringToNull, EmptyToUndefined } from '@common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDTO {
  @ApiProperty({ type: String, description: '이메일' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ type: String, description: '비밀번호', format: 'password' })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  password: string;

  @ApiProperty({ type: String, description: '비밀번호 확인', format: 'password' })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  confirmPassword: string;

  @ApiProperty({ type: String, description: '이름' })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  name: string;

  @ApiPropertyOptional({ type: String, description: '연락처' })
  @IsOptional()
  @IsString()
  @EmptyStringToNull()
  contact?: string | null;

  @ApiPropertyOptional({ type: Boolean, description: '활성여부' })
  @IsOptional()
  @IsBoolean()
  @EmptyToUndefined()
  isActive?: boolean;
}
