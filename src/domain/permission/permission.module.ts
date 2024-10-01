import { PermissionEntity } from '@choewy/troublesome-entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PermissionService } from './permission.service';

@Module({
  imports: [TypeOrmModule.forFeature([PermissionEntity])],
  providers: [PermissionService],
  exports: [PermissionService],
})
export class PermissionModule {}
