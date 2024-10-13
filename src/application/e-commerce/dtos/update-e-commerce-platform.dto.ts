import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateEcommercePlatformDTO {
  @ApiPropertyOptional({ type: String, description: '플랫폼명' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ type: Boolean, description: '활성여부' })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
