import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { InvitationService } from './invitation.service';

import { InvitationEntity } from '@/libs';

@Module({
  imports: [TypeOrmModule.forFeature([InvitationEntity])],
  providers: [InvitationService],
  exports: [InvitationService],
})
export class InvitationModule {}
