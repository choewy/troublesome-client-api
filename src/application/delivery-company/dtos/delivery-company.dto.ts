import { ApiProperty } from '@nestjs/swagger';

import { DeliveryCompanyEntity } from '@/domain/delivery-company/delivery-company.entity';

export class DeliveryCompanyDTO {
  @ApiProperty({ type: Number, description: 'PK' })
  id: number;

  @ApiProperty({ type: String, description: '택배사 이름' })
  name: string;

  @ApiProperty({ type: Date, description: '등록일시' })
  createdAt: Date;

  constructor(deliveryCompany: DeliveryCompanyEntity) {
    this.id = deliveryCompany.id;
    this.name = deliveryCompany.name;
    this.createdAt = deliveryCompany.createdAt;
  }
}
