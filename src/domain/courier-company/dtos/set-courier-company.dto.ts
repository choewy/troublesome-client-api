import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SetCourierCompanyDTO {
  @ApiProperty({ type: String, description: '택배사명' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
