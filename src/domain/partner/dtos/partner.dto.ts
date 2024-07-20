import { DateToISOString, NullToEmptyString } from '@common';
import { ApiResponseProperty } from '@nestjs/swagger';

import { PartnerEntity } from '../entities';

export class PartnerDTO {
  @ApiResponseProperty({ type: Number })
  id: number;

  @ApiResponseProperty({ type: String })
  name: string;

  @ApiResponseProperty({ type: String })
  @NullToEmptyString()
  ceo: string;

  @ApiResponseProperty({ type: String })
  @NullToEmptyString()
  email: string;

  @ApiResponseProperty({ type: String })
  @NullToEmptyString()
  contact: string;

  @ApiResponseProperty({ type: String })
  @NullToEmptyString()
  fax: string;

  @ApiResponseProperty({ type: String })
  @NullToEmptyString()
  zip: string;

  @ApiResponseProperty({ type: String })
  @NullToEmptyString()
  address: string;

  @ApiResponseProperty({ type: String })
  @NullToEmptyString()
  addressDetail: string;

  @ApiResponseProperty({ type: Date })
  @DateToISOString()
  createdAt: Date;

  @ApiResponseProperty({ type: Date })
  @DateToISOString()
  updatedAt: Date;

  constructor(partner: PartnerEntity) {
    this.id = partner.id;
    this.name = partner.name;
    this.ceo = partner.ceo;
    this.email = partner.email;
    this.contact = partner.contact;
    this.fax = partner.fax;
    this.zip = partner.zip;
    this.address = partner.address;
    this.addressDetail = partner.addressDetail;
    this.createdAt = partner.createdAt;
    this.updatedAt = partner.updatedAt;
  }
}
