import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional } from 'class-validator';

export class PaginationQueryDTO {
  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @IsInt()
  skip = 0;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @IsInt()
  take = 20;
}
