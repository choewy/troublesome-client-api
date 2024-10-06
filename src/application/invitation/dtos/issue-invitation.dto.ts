import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class IssueInvitationDTO {
  @ApiProperty({ type: String, format: 'email', description: '초대하려는 이메일 계정' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiPropertyOptional({ type: Number, description: '고객사 PK' })
  @IsInt()
  @IsOptional()
  partnetId?: number;

  @ApiPropertyOptional({ type: Number, description: '풀필먼트 센터 PK' })
  @IsInt()
  @IsOptional()
  fulfillmentId?: number;
}
