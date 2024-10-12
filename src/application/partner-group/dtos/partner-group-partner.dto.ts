import { ApiProperty } from '@nestjs/swagger';

import { PartnerEntity } from '@/domain/partner/partner.entity';

export class PartnerGroupPartnerDTO {
  @ApiProperty({ type: Number, description: '고객사 PK' })
  id: number;

  @ApiProperty({ type: String, description: '고객사 이름' })
  name: string;

  @ApiProperty({ type: Date, description: '생성일시' })
  createdAt: Date;

  constructor(partner: PartnerEntity) {
    this.id = partner.id;
    this.name = partner.name;
    this.createdAt = partner.createdAt;
  }
}
