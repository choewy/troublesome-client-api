import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from './user.service';
import { InvitationModule } from '../invitation';

import { UserEntity } from '@/libs';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), forwardRef(() => InvitationModule)],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
