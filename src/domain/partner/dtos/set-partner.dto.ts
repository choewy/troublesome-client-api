import { EmptyStringToNull } from '@common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, Length, MinLength } from 'class-validator';

export class SetPartnerDTO {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  name: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  @EmptyStringToNull()
  ceo?: string | null;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsEmail()
  @EmptyStringToNull()
  email?: string | null;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  @EmptyStringToNull()
  contact?: string | null;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  @EmptyStringToNull()
  fax?: string | null;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  @Length(5, 5)
  @EmptyStringToNull()
  zip?: string | null;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  @EmptyStringToNull()
  address?: string | null;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  @EmptyStringToNull()
  addressDetail?: string | null;
}
