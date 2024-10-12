import { ApiProperty } from '@nestjs/swagger';

import { FulfillmentGroupFulfillmentDTO } from './fulfillment-group-fulfillment.dto';
import { FulfillmentGroupManagerDTO } from './fulfillment-group-manager.dto';

import { FulfillmentGroupEntity } from '@/domain/fulfillment-group/fulfillment-group.entity';

export class FulfillmentGroupDTO {
  @ApiProperty({ type: Number, description: '풀필먼트 센터 그룹 PK' })
  id: number;

  @ApiProperty({ type: String, description: '풀필먼트 센터 이름' })
  name: string;

  @ApiProperty({ type: Date, description: '등록일시' })
  createdAt: Date;

  @ApiProperty({ type: FulfillmentGroupManagerDTO, description: '풀필먼트 센터 관리자 정보' })
  manager: FulfillmentGroupManagerDTO | null;

  @ApiProperty({ type: [FulfillmentGroupFulfillmentDTO], description: '풀필먼트 센터 목록' })
  fulfillments: FulfillmentGroupFulfillmentDTO[];

  constructor(fulfillmentGroup: FulfillmentGroupEntity) {
    this.id = fulfillmentGroup.id;
    this.name = fulfillmentGroup.name;
    this.createdAt = fulfillmentGroup.createdAt;
    this.manager = null;
    this.fulfillments = [];

    if (fulfillmentGroup.manager) {
      this.manager = new FulfillmentGroupManagerDTO(fulfillmentGroup.manager);
    }

    for (const fulfillment of fulfillmentGroup.fulfillments) {
      this.fulfillments.push(new FulfillmentGroupFulfillmentDTO(fulfillment));
    }
  }
}
