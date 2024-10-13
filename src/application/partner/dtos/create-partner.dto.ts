import { ApiProperty } from '@nestjs/swagger';
import { IsInstance, IsNotEmpty, IsString } from 'class-validator';

import { CreatePartnerManagerDTO } from './create-partner-manager.dto';

export class CreatePartnerDTO {
  @ApiProperty({ type: String, description: '고객사 이름' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: CreatePartnerManagerDTO, description: '고객사 관리자 계정' })
  @IsInstance(CreatePartnerManagerDTO)
  @IsNotEmpty()
  manager: CreatePartnerManagerDTO;
}
