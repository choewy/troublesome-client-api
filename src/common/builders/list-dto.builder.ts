import { Type } from '@nestjs/common';
import { ApiResponseProperty } from '@nestjs/swagger';

export type ListDTOArgs<Entity> = [Entity[], number];

export const ListDTOBuilder = <Entity, D = any>(DTO: Type<D>) => {
  class ListDTO {
    @ApiResponseProperty({ type: Number })
    total: number;

    @ApiResponseProperty({ type: [DTO] })
    rows: D[];

    constructor([entities, total]: ListDTOArgs<Entity>) {
      this.total = total;
      this.rows = entities.map((entity) => new DTO(entity));
    }
  }

  return ListDTO;
};
