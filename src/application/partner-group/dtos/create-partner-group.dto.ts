import { ApiProperty } from '@nestjs/swagger';
import { IsInstance, IsNotEmpty, IsString } from 'class-validator';

import { CreatePartnerGroupManagerDTO } from './create-partner-group-manager.dto';

export class CreatePartnerGroupDTO {
  @ApiProperty({ type: String, description: '고객사 그룹 이름' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: CreatePartnerGroupManagerDTO, description: '고객사 그룹 관리자 계정' })
  @IsInstance(CreatePartnerGroupManagerDTO)
  @IsNotEmpty()
  manager: CreatePartnerGroupManagerDTO;
}
