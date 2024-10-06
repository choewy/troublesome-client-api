import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreatePartnerDTO {
  @ApiProperty({ type: String, description: '고객사 이름' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: String, description: '고객사 그룹 PK' })
  @IsInt()
  @IsNotEmpty()
  partnerGroupId: number;
}
