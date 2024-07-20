import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CourierCompanyParamDTO {
  @ApiProperty({ type: Number, description: 'PK' })
  @IsInt()
  @IsNotEmpty()
  id: number;
}
