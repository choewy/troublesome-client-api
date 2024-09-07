import { DateToISOString, NullToEmptyString } from '@common';
import { ApiResponseProperty } from '@nestjs/swagger';

import { UserEntity } from '../entities';

export class UserDTO {
  @ApiResponseProperty({ type: Number })
  id: number;

  @ApiResponseProperty({ type: String })
  name: string;

  @ApiResponseProperty({ type: String })
  email: string;

  @ApiResponseProperty({ type: String })
  @NullToEmptyString()
  contact: string;

  @ApiResponseProperty({ type: Boolean })
  isActive: boolean;

  @ApiResponseProperty({ type: Date })
  @DateToISOString()
  createdAt: Date;

  @ApiResponseProperty({ type: Date })
  @DateToISOString()
  updatedAt: Date;

  constructor(user: UserEntity) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.contact = user.contact;
    this.isActive = user.isActive;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}
