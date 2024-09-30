import { InvitationEntity } from '@choewy/troublesome-entity';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { InvitationController } from './invitation.controller';
import { InvitationService } from './invitation.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([InvitationEntity]), forwardRef(() => UserModule)],
  controllers: [InvitationController],
  providers: [InvitationService],
  exports: [InvitationService],
})
export class InvitationModule {}
