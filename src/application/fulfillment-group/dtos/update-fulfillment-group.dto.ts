import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateFulfillmentGroupDTO {
  @ApiPropertyOptional({ type: String, description: '풀필먼트 센터 그룹명' })
  @IsString()
  @IsOptional()
  name?: string;
}
