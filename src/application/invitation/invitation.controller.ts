import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { IssueInvitationDTO } from './dtos';
import { InvitationUseCase } from './invitation.service';

import { Private } from '@/common';

@Private()
@ApiTags('초대')
@Controller('invitations')
export class InvitationController {
  constructor(private readonly invitationUseCase: InvitationUseCase) {}

  @Post()
  @ApiOperation({ summary: '초대권 발행 및 초대 이메일 발송' })
  @ApiCreatedResponse()
  async issueInvitation(@Body() body: IssueInvitationDTO) {
    return this.invitationUseCase.issueInvitation(body);
  }
}
