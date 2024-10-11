import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional } from 'class-validator';

export class ConvertDTO {
  @ApiProperty({ type: Number, description: '고객사 PK' })
  @IsInt()
  @IsOptional()
  partnerId?: number;

  @ApiProperty({ type: Number, description: '풀필먼트 센터 PK' })
  @IsInt()
  @IsOptional()
  fulfillmentId?: number;
}
