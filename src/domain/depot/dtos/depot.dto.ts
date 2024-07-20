import { DateToISOString, NullToEmptyString } from '@common';
import { ApiResponseProperty } from '@nestjs/swagger';

import { DepotEntity } from '../entities';

export class DepotDTO {
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
  addressDetails: string;

  @ApiResponseProperty({ type: String })
  @NullToEmptyString()
  plantCode: string;

  @ApiResponseProperty({ type: Date })
  @DateToISOString()
  createdAt: Date;

  @ApiResponseProperty({ type: Date })
  @DateToISOString()
  updatedAt: Date;

  constructor(depot: DepotEntity) {
    this.id = depot.id;
    this.name = depot.name;
    this.contact = depot.contact;
    this.zip = depot.zip;
    this.address = depot.address;
    this.addressDetails = depot.addressDetails;
    this.plantCode = depot.plantCode;
    this.createdAt = depot.createdAt;
    this.updatedAt = depot.updatedAt;
  }
}
