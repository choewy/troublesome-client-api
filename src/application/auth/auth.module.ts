import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

import { InvitationRepository } from '@/domain/invitation/invitation.repository';
import { TokenService } from '@/domain/token/token.service';
import { UserRepository } from '@/domain/user/user.repository';

@Module({
  imports: [JwtModule],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard, TokenService, UserRepository, InvitationRepository],
  exports: [AuthGuard],
})
export class AuthModule {}
