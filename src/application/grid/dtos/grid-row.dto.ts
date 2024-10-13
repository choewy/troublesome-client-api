import { ApiProperty } from '@nestjs/swagger';

import { GridEntity } from '@/domain/grid/grid.entity';

export class GridRowDTO {
  @ApiProperty({ type: String, description: '필드명' })
  fieldName: string;

  @ApiProperty({ type: String, description: '컬럼명' })
  text: string;

  @ApiProperty({ type: Number, description: '너비(단위 : px)' })
  width: number;

  @ApiProperty({ type: Boolean, description: '노출여부' })
  isVisible: boolean;

  @ApiProperty({ type: Boolean, description: '고정여부' })
  isFixed: boolean;

  constructor(grid: GridEntity) {
    this.fieldName = grid.fieldName;
    this.text = grid.text;
    this.width = grid.width;
    this.isVisible = grid.isVisible;
    this.isFixed = grid.isFixed;
  }
}
