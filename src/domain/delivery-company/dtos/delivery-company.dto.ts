import { DateToISOString } from '@common';
import { ApiResponseProperty } from '@nestjs/swagger';

import { DeliveryCompanyEntity } from '../entities';

export class DeliveryCompanyDTO {
  @ApiResponseProperty({ type: Number })
  id: number;

  @ApiResponseProperty({ type: String })
  name: string;

  @ApiResponseProperty({ type: Date })
  @DateToISOString()
  createdAt: Date;

  @ApiResponseProperty({ type: Date })
  @DateToISOString()
  updatedAt: Date;

  constructor(deliveryCompany: DeliveryCompanyEntity) {
    this.id = deliveryCompany.id;
    this.name = deliveryCompany.name;
    this.createdAt = deliveryCompany.createdAt;
    this.updatedAt = deliveryCompany.updatedAt;
  }
}
