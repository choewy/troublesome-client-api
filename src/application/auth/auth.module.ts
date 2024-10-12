import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

import { FulfillmentRepository } from '@/domain/fulfillment/fulfillment.repository';
import { FulfillmentGroupRepository } from '@/domain/fulfillment-group/fulfillment-group.repository';
import { InvitationRepository } from '@/domain/invitation/invitation.repository';
import { PartnerRepository } from '@/domain/partner/partner.repository';
import { PartnerGroupRepository } from '@/domain/partner-group/partner-group.repository';
import { UserRepository } from '@/domain/user/user.repository';

@Module({
  imports: [JwtModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthGuard,
    UserRepository,
    PartnerGroupRepository,
    PartnerRepository,
    FulfillmentGroupRepository,
    FulfillmentRepository,
    InvitationRepository,
  ],
  exports: [AuthGuard],
})
export class AuthModule {}
