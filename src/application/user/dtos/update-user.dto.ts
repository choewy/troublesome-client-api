import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDTO {
  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ type: String, format: 'password' })
  @IsString()
  @IsOptional()
  password?: string;

  @ApiPropertyOptional({ type: String, format: 'password' })
  @IsString()
  @IsOptional()
  confirmPassword?: string;
}
