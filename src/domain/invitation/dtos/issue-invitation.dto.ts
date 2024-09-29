import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class IssueInvitationDTO {
  @ApiProperty({ type: String, format: 'email', description: '초대하려는 이메일 계정' })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
