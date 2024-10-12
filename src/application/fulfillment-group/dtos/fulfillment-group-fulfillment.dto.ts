import { ApiProperty } from '@nestjs/swagger';

import { FulfillmentEntity } from '@/domain/fulfillment/fulfillment.entity';

export class FulfillmentGroupFulfillmentDTO {
  @ApiProperty({ type: Number, description: '풀필먼트 PK' })
  id: number;

  @ApiProperty({ type: String, description: '풀필먼트 이름' })
  name: string;

  @ApiProperty({ type: String, description: '풀필먼트 플랜트 코드' })
  plantCode: string;

  @ApiProperty({ type: Date, description: '생성일시' })
  createdAt: Date;

  constructor(fulfillment: FulfillmentEntity) {
    this.id = fulfillment.id;
    this.name = fulfillment.name;
    this.plantCode = fulfillment.plantCode;
    this.createdAt = fulfillment.createdAt;
  }
}
