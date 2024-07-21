import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';

import { RolePermissionScope, RolePermissionScopeValues } from '../constants';

export class SetRoleDTO {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  name: string;

  @ApiProperty({ type: [String], enum: RolePermissionScopeValues })
  @IsNotEmpty()
  @IsArray()
  @IsEnum(RolePermissionScopeValues, { each: true })
  permissions: RolePermissionScope[];
}
