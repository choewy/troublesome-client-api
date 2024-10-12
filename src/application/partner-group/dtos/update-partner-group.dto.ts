import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdatePartnerGroupDTO {
  @ApiPropertyOptional({ type: String, description: '고객사 그룹명' })
  @IsString()
  @IsOptional()
  name?: string;
}
