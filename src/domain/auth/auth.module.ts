import { forwardRef, Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { InvitationModule } from '../invitation/invitation.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [forwardRef(() => UserModule), forwardRef(() => InvitationModule)],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  exports: [AuthService, AuthGuard],
})
export class AuthModule {}
