import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumberString, IsOptional, IsString, Length } from 'class-validator';

export class UpdatePartnerDTO {
  @ApiPropertyOptional({ type: String, description: '고객사 이름' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ type: String, description: '우편번호' })
  @IsNumberString()
  @Length(5, 6)
  @IsOptional()
  zipCode?: string;

  @ApiPropertyOptional({ type: String, description: '주소' })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiPropertyOptional({ type: String, description: '상세주소' })
  @IsString()
  @IsOptional()
  addressDetail?: string;
}
