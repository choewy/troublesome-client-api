import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { IssueInvitationDTO } from './dtos';
import { InvitationUseCase } from './invitation.service';

import { Private } from '@/common';
import { PermissionTarget } from '@/domain/permission/enums';

@ApiTags('초대')
@Controller('invitations')
export class InvitationController {
  constructor(private readonly invitationUseCase: InvitationUseCase) {}

  @Post()
  @Private(PermissionTarget.InvitationCreate)
  @ApiOperation({ summary: '회원가입 초대 이메일 발송' })
  @ApiCreatedResponse()
  async issueInvitation(@Body() body: IssueInvitationDTO) {
    return this.invitationUseCase.issueInvitation(body);
  }
}
