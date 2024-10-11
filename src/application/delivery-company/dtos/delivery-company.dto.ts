import { ApiProperty } from '@nestjs/swagger';

import { DeliveryCompanyEntity } from '@/domain/delivery-company/delivery-company.entity';

export class DeliveryCompanyDTO {
  @ApiProperty({ type: Number, description: '택배사 PK' })
  id: number;

  @ApiProperty({ type: String, description: '택배사 이름' })
  name: string;

  @ApiProperty({ type: String, description: '택배사 별칭' })
  alias: string;

  constructor(deliveryCompany: DeliveryCompanyEntity) {
    this.id = deliveryCompany.id;
    this.name = deliveryCompany.name;
    this.alias = deliveryCompany.alias;
  }
}
