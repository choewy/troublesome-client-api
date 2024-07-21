import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInstance, IsNotEmpty } from 'class-validator';

import { SetRoleUserDTO } from './set-role-user.dto';

export class SetRoleUserMapDTO {
  @ApiProperty({ type: [SetRoleUserDTO] })
  @IsNotEmpty()
  @IsArray()
  @IsInstance(SetRoleUserDTO, { each: true })
  insert: SetRoleUserDTO[];

  @ApiProperty({ type: [SetRoleUserDTO] })
  @IsNotEmpty()
  @IsArray()
  @IsInstance(SetRoleUserDTO, { each: true })
  remove: SetRoleUserDTO[];
}
