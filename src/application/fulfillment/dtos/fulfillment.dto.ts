import { ApiProperty } from '@nestjs/swagger';

import { FulfillmentDefaultDeliveryCompanyDTO } from './fulfillment-default-delivery-company.dto';

import { FulfillmentEntity } from '@/domain/fulfillment/fulfillment.entity';

export class FulfillmentDTO {
  @ApiProperty({ type: Number, description: '풀필먼트 센터 PK' })
  id: number;

  @ApiProperty({ type: String, description: '풀필먼트 센터 이름' })
  name: string;

  @ApiProperty({ type: Date, description: '등록일시' })
  createdAt: Date;

  @ApiProperty({ type: FulfillmentDefaultDeliveryCompanyDTO, description: '기본 택배사 정보' })
  defaultDeliveryCompany: FulfillmentDefaultDeliveryCompanyDTO | null;

  constructor(fulfillment: FulfillmentEntity) {
    this.id = fulfillment.id;
    this.name = fulfillment.name;
    this.createdAt = fulfillment.createdAt;
    this.defaultDeliveryCompany = null;

    const deliveryCompanySettings = fulfillment.deliveryCompanySettings ?? [];

    if (deliveryCompanySettings.length === 0) {
      return;
    }

    const deliveryCompany = deliveryCompanySettings[0]?.deliveryCompany ?? null;

    if (deliveryCompany === null) {
      return;
    }

    this.defaultDeliveryCompany = new FulfillmentDefaultDeliveryCompanyDTO(deliveryCompany);
  }
}
