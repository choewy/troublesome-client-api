import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateGridDTO {
  @ApiProperty({ type: String, description: '필드명' })
  @IsString()
  @IsNotEmpty()
  fieldName: string;

  @ApiPropertyOptional({ type: Number, description: '너비(단위 : px)' })
  @IsInt()
  @IsOptional()
  width?: number;

  @ApiPropertyOptional({ type: Boolean, description: '노출여부' })
  @IsBoolean()
  @IsOptional()
  isVisible?: boolean;

  @ApiPropertyOptional({ type: Boolean, description: '고정여부' })
  @IsBoolean()
  @IsOptional()
  isFixed?: boolean;
}
