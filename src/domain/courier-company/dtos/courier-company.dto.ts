import { DateToISOString } from '@common';
import { ApiResponseProperty } from '@nestjs/swagger';

import { CourierCompanyEntity } from '../entities';

export class CourierCompanyDTO {
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

  constructor(courierCompany: CourierCompanyEntity) {
    this.id = courierCompany.id;
    this.name = courierCompany.name;
    this.createdAt = courierCompany.createdAt;
    this.updatedAt = courierCompany.updatedAt;
  }
}
