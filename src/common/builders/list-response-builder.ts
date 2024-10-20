import { Type } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export const ListResponsBuilder = <Entity, D = any>(DTO: Type<D>) => {
  class ListDTO {
    @ApiProperty({ type: Number })
    total: number;

    @ApiProperty({ type: [DTO] })
    rows: D[];

    constructor([entities, total]: [Entity[], number]) {
      this.total = total;
      this.rows = entities.map((entity) => new DTO(entity));
    }
  }

  return ListDTO;
};
