import { ApiProperty } from '@nestjs/swagger';
import { IsInstance, IsNotEmpty, IsString } from 'class-validator';

import { CreatePartnerGroupAdminDTO } from './create-partner-group-admin.dto';

export class CreatePartnerGroupDTO {
  @ApiProperty({ type: String, description: '고객사 그룹 이름' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: CreatePartnerGroupAdminDTO, description: '고객사 그룹 관리자 계정' })
  @IsInstance(CreatePartnerGroupAdminDTO)
  @IsNotEmpty()
  admin: CreatePartnerGroupAdminDTO;
}
