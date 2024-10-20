import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

export const ListQueryBuilder = () => {
  class ListQueryDTO {
    @ApiPropertyOptional({ type: Number })
    @Type(() => Number)
    @IsOptional()
    skip: number = 0;

    @ApiPropertyOptional({ type: Number })
    @Type(() => Number)
    @IsOptional()
    take: number = 50;
  }

  return ListQueryDTO;
};
