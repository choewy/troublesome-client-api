import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInstance, IsNotEmpty, IsNumberString, IsOptional, IsString, Length } from 'class-validator';

import { CreatePartnerManagerDTO } from './create-partner-manager.dto';

export class CreatePartnerDTO {
  @ApiProperty({ type: String, description: '고객사 이름' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: CreatePartnerManagerDTO, description: '고객사 관리자 계정' })
  @IsInstance(CreatePartnerManagerDTO)
  @IsNotEmpty()
  manager: CreatePartnerManagerDTO;

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
