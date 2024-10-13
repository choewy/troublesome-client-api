import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';

import { GridTarget } from '@/domain/grid/enums';

export class GridListParamDTO {
  @ApiProperty({ type: String, enum: GridTarget, description: '테이블명' })
  @IsEnum(GridTarget)
  @IsNotEmpty()
  target: GridTarget;
}
