import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDeliveryCompanyDTO {
  @ApiProperty({ type: String, description: '택배사 이름' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: String, description: '택배사 별칭' })
  @IsString()
  @IsNotEmpty()
  alias: string;
}
