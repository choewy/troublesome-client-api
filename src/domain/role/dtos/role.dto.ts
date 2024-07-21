import { DateToISOString } from '@common';
import { ApiResponseProperty } from '@nestjs/swagger';

import { RolePermissionScope, RolePermissionScopeValues } from '../constants';
import { RoleEntity } from '../entities';

export class RoleDTO {
  @ApiResponseProperty({ type: Number })
  id: number;

  @ApiResponseProperty({ type: String })
  name: string;

  @ApiResponseProperty({ type: [String], enum: RolePermissionScopeValues })
  permissions: RolePermissionScope[];

  @ApiResponseProperty({ type: Date })
  @DateToISOString()
  createdAt: Date;

  @ApiResponseProperty({ type: Date })
  @DateToISOString()
  updatedAt: Date;

  constructor(role: RoleEntity) {
    this.id = role.id;
    this.name = role.name;
    this.permissions = role.permissions.map((rolePermission) => rolePermission.scope);
    this.createdAt = role.createdAt;
    this.updatedAt = role.updatedAt;
  }
}
