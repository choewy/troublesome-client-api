import { DateToISOString, NullToEmptyString } from '@common';
import { ApiResponseProperty } from '@nestjs/swagger';

import { CenterEntity } from '../entities';

export class CenterDTO {
  @ApiResponseProperty({ type: Number })
  id: number;

  @ApiResponseProperty({ type: String })
  name: string;

  @ApiResponseProperty({ type: String })
  @NullToEmptyString()
  contact: string;

  @ApiResponseProperty({ type: String })
  @NullToEmptyString()
  zip: string;

  @ApiResponseProperty({ type: String })
  @NullToEmptyString()
  address: string;

  @ApiResponseProperty({ type: String })
  @NullToEmptyString()
  addressDetail: string;

  @ApiResponseProperty({ type: String })
  @NullToEmptyString()
  plantCode: string;

  @ApiResponseProperty({ type: Date })
  @DateToISOString()
  createdAt: Date;

  @ApiResponseProperty({ type: Date })
  @DateToISOString()
  updatedAt: Date;

  constructor(center: CenterEntity) {
    this.id = center.id;
    this.name = center.name;
    this.contact = center.contact;
    this.zip = center.zip;
    this.address = center.address;
    this.addressDetail = center.addressDetail;
    this.plantCode = center.plantCode;
    this.createdAt = center.createdAt;
    this.updatedAt = center.updatedAt;
  }
}
