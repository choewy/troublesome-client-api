import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class NumberPKParamDTO {
  @ApiProperty({ type: Number, description: 'PK' })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  id: number;
}
