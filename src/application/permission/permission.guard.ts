import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { PermissionService } from './permission.service';

import { getPermissionTarget } from '@/common';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly permissionService: PermissionService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const permissionTarget = getPermissionTarget(this.reflector, context);

    if (permissionTarget === null) {
      return true;
    }

    return this.permissionService.checkPermission(permissionTarget);
  }
}
