import { ApiProperty } from '@nestjs/swagger';

import { GridRowDTO } from './grid-row.dto';

import { GridTarget } from '@/domain/grid/enums';
import { GridEntity } from '@/domain/grid/grid.entity';

export class GridListDTO {
  @ApiProperty({ type: String, enum: GridTarget, description: '테이블명' })
  target: GridTarget;

  @ApiProperty({ type: [GridRowDTO], description: '컬럼 정보' })
  rows: GridRowDTO[];

  constructor(target: GridTarget, grids: GridEntity[]) {
    this.target = target;
    this.rows = [];

    for (const grid of grids) {
      this.rows.push(new GridRowDTO(grid));
    }
  }
}
