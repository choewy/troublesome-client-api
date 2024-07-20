import { ApiResponseProperty } from '@nestjs/swagger';
import { DateTime } from 'luxon';

import { CourierCompanyEntity } from '../entities';

export class CourierCompanyDTO {
  @ApiResponseProperty({ type: Number })
  id: number;

  @ApiResponseProperty({ type: String })
  name: string;

  @ApiResponseProperty({ type: Date })
  createdAt: string;

  constructor(courierCompany: CourierCompanyEntity) {
    this.id = courierCompany.id;
    this.name = courierCompany.name;
    this.createdAt = DateTime.fromJSDate(courierCompany.createdAt).toSQL({ includeOffset: false });
  }
}
