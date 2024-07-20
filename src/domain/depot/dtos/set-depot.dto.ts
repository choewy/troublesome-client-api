import { EmptyStringToNull } from '@common';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumberString, IsOptional, IsString, Length, MinLength } from 'class-validator';

export class SetDepotDTO {
  @ApiProperty({ type: String })
  @MinLength(1)
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  @EmptyStringToNull()
  contact?: string | null;

  @ApiProperty({ type: String })
  @IsNumberString()
  @Length(5, 5)
  @IsOptional()
  @EmptyStringToNull()
  zip?: string | null;

  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  @EmptyStringToNull()
  address?: string | null;

  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  @EmptyStringToNull()
  addressDetails?: string | null;

  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  @EmptyStringToNull()
  plantCode?: string | null;

  @ApiProperty({ type: Number })
  @IsInt()
  @IsOptional()
  courierCompanyId?: number | null;
}
