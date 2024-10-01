import { RoleEntity } from '@choewy/troublesome-entity';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { PermissionModule } from '../permission/permission.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity]), forwardRef(() => UserModule), forwardRef(() => PermissionModule)],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
