import { CenterModule } from '@domain/center';
import { PartnerModule } from '@domain/partner';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from './entities';
import { UserController } from './user.controller';
import { UserInterceptor } from './user.interceptor';
import { UserService } from './user.service';

@Module({
  imports: [forwardRef(() => PartnerModule), forwardRef(() => CenterModule), TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService, UserInterceptor],
  exports: [UserService],
})
export class UserModule {}
