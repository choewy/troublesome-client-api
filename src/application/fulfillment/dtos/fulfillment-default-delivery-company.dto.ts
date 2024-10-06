import { ApiProperty } from '@nestjs/swagger';

import { DeliveryCompanyEntity } from '@/domain/delivery-company/delivery-company.entity';

export class FulfillmentDefaultDeliveryCompanyDTO {
  @ApiProperty({ type: Number, description: '택배사 PK' })
  id: number;

  @ApiProperty({ type: String, description: '택배사 이름' })
  name: string;

  constructor(deliveryCompany: DeliveryCompanyEntity) {
    this.id = deliveryCompany.id;
    this.name = deliveryCompany.name;
  }
}
