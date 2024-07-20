import { EmptyStringToNull, EmptyToUndefined } from '@common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserDTO {
  @ApiProperty({ type: String, description: '이름' })
  @IsOptional()
  @IsString()
  @MinLength(1)
  name: string;

  @ApiPropertyOptional({ type: String, description: '이메일' })
  @IsOptional()
  @IsEmail()
  @EmptyStringToNull()
  email?: string | null;

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
