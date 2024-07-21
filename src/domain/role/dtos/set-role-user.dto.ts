import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class SetRoleUserDTO {
  @ApiProperty({ type: Number })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  userId: number;

  @ApiProperty({ type: Number })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  roleId: number;
}
