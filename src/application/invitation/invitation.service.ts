import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';

import { InvitationModuleErrorCode } from './constants';
import { IssueInvitationDTO } from './dtos';

import { Exception } from '@/core';
import { InvitationRepository } from '@/domain/invitation/invitation.repository';
import { UserRepository } from '@/domain/user/user.repository';
import { ContextService } from '@/global';

@Injectable()
export class InvitationUseCase {
  constructor(
    private readonly contextService: ContextService,
    private readonly userRepository: UserRepository,
    private readonly invitationRepository: InvitationRepository,
  ) {}

  async create(body: IssueInvitationDTO) {
    if (!body.partnetId && !body.fulfillmentId) {
      throw new BadRequestException();
    }

    const userContext = this.contextService.getUser();

    if (body.email === userContext.email) {
      throw new Exception(InvitationModuleErrorCode.CannotInviteYourSelf, HttpStatus.CONFLICT);
    }

    const hasEmail = await this.userRepository.hasEmail(body.email);

    if (hasEmail) {
      throw new Exception(InvitationModuleErrorCode.AlreadyInvitedUser, HttpStatus.CONFLICT);
    }

    await this.invitationRepository.insert({ email: body.email, user: { id: userContext.id } });

    // TODO send email
  }
}
