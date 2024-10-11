import { Module } from '@nestjs/common';

import { PermissionController } from './permission.controller';
import { PermissionGuard } from './permission.guard';
import { PermissionService } from './permission.service';

@Module({
  controllers: [PermissionController],
  providers: [PermissionService, PermissionGuard],
  exports: [PermissionGuard],
})
export class PermissionModule {}
