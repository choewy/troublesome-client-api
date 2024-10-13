import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateEcommercePlatformDTO {
  @ApiProperty({ type: String, description: '플랫폼명' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ type: Boolean, description: '활성여부' })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
