import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { InvitationDTO, IssueInvitationDTO } from './dtos';
import { InvitationService } from './invitation.service';

import { Private } from '@/common';

@Private()
@ApiTags('초대')
@Controller('invitations')
export class InvitationController {
  constructor(private readonly invitationService: InvitationService) {}

  @Post()
  @ApiOperation({ summary: '초대권 발행 및 초대 이메일 발송' })
  @ApiCreatedResponse({ type: InvitationDTO })
  async issueInvitation(@Body() body: IssueInvitationDTO) {
    return this.invitationService.issueInvitation(body);
  }
}
