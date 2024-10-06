import { ApiProperty } from '@nestjs/swagger';

import { PartnerGroupAdminDTO } from './partner-group-admin.dto';

import { PartnerGroupEntity } from '@/domain/partner-group/partner-group.entity';

export class PartnerGroupDTO {
  @ApiProperty({ type: Number, description: '고객사 그룹 PK' })
  id: number;

  @ApiProperty({ type: String, description: '고객사 그룹 이름' })
  name: string;

  @ApiProperty({ type: Date, description: '등록일시' })
  createdAt: Date;

  @ApiProperty({ type: PartnerGroupAdminDTO, description: '고객사 그룹 관리자 정보' })
  admin: PartnerGroupAdminDTO | null;

  constructor(partnerGroup: PartnerGroupEntity) {
    this.id = partnerGroup.id;
    this.name = partnerGroup.name;
    this.createdAt = partnerGroup.createdAt;
    this.admin = null;

    if (partnerGroup.user) {
      this.admin = new PartnerGroupAdminDTO(partnerGroup.user);
    }
  }
}
