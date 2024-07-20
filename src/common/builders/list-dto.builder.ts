import { Type } from '@nestjs/common';
import { ApiResponseProperty } from '@nestjs/swagger';

export const ListDTOBuilder = <Entity, D = any>(DTO: Type<D>) => {
  class ListDTO {
    @ApiResponseProperty({ type: Number })
    total: number;

    @ApiResponseProperty({ type: [DTO] })
    rows: D[];

    constructor(entities: Entity[], total: number) {
      this.total = total;
      this.rows = entities.map((entity) => new DTO(entity));
    }
  }

  return ListDTO;
};
