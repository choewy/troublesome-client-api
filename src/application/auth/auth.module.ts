import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtGuard } from './guards';
import { InvitationModule } from '../invitation';
import { UserModule } from '../user';

@Module({
  imports: [JwtModule, forwardRef(() => UserModule), forwardRef(() => InvitationModule)],
  controllers: [AuthController],
  providers: [AuthService, JwtGuard],
  exports: [AuthService, JwtGuard],
})
export class AuthModule {}
