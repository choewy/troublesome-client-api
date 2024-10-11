import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateDeliveryCompanyDTO {
  @ApiPropertyOptional({ type: String, description: '택배사 이름' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ type: String, description: '택배사 별칭' })
  @IsString()
  @IsOptional()
  alias?: string;
}
