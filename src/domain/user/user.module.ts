import { UserEntity } from '@choewy/troublesome-entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './user.controller';
import { UserGuard } from './user.guard';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService, UserGuard],
  exports: [UserService, UserGuard],
})
export class UserModule {}
