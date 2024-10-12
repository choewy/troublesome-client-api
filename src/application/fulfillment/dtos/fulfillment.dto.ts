import { ApiProperty } from '@nestjs/swagger';

import { FulfillmentDefaultDeliveryCompanyDTO } from './fulfillment-default-delivery-company.dto';

import { FulfillmentEntity } from '@/domain/fulfillment/fulfillment.entity';

export class FulfillmentDTO {
  @ApiProperty({ type: Number, description: '풀필먼트 센터 PK' })
  id: number;

  @ApiProperty({ type: String, description: '풀필먼트 센터 이름' })
  name: string;

  @ApiProperty({ type: String, description: '플랜트 코드' })
  plantCode: string;

  @ApiProperty({ type: String, description: '우편번호' })
  zipCode: string;

  @ApiProperty({ type: String, description: '주소' })
  address: string;

  @ApiProperty({ type: String, description: '상세 주소' })
  addressDetail: string;

  @ApiProperty({ type: FulfillmentDefaultDeliveryCompanyDTO, description: '기본 택배사 정보' })
  defaultDeliveryCompany: FulfillmentDefaultDeliveryCompanyDTO | null;

  @ApiProperty({ type: Date, description: '등록일시' })
  createdAt: Date;

  @ApiProperty({ type: Date, description: '수정일시' })
  updatedAt: Date;

  constructor(fulfillment: FulfillmentEntity) {
    this.id = fulfillment.id;
    this.name = fulfillment.name;
    this.plantCode = fulfillment.plantCode;
    this.zipCode = fulfillment.zipCode;
    this.address = fulfillment.address;
    this.addressDetail = fulfillment.addressDetail;

    const defaultDeliveryCompany = fulfillment.deliveryCompanySettings[0]?.deliveryCompany ?? null;

    if (defaultDeliveryCompany) {
      this.defaultDeliveryCompany = new FulfillmentDefaultDeliveryCompanyDTO(defaultDeliveryCompany);
    } else {
      this.defaultDeliveryCompany = null;
    }

    this.createdAt = fulfillment.createdAt;
    this.updatedAt = fulfillment.updatedAt;
  }
}
