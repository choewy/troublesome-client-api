import { Module } from '@nestjs/common';

import { InvitationController } from './invitation.controller';
import { InvitationUseCase } from './invitation.service';

import { InvitationRepository } from '@/domain/invitation/invitation.repository';
import { UserRepository } from '@/domain/user/user.repository';

@Module({
  controllers: [InvitationController],
  providers: [InvitationUseCase, InvitationRepository, UserRepository],
})
export class InvitationModule {}
