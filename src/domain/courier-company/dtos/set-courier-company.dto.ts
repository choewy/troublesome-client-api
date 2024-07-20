import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SetCourierCompanyDTO {
  @ApiProperty({ type: String, description: '택배사명' })
  @MinLength(1)
  @IsString()
  @IsNotEmpty()
  name: string;
}
