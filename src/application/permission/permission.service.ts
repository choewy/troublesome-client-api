import { HttpStatus, Injectable } from '@nestjs/common';

import { PermissionModuleErrorCode } from './constants';
import { PermissionMetadataDTO } from './dtos';
import { PermissionMetadataMap } from './implements';

import { Exception } from '@/core';
import { PermissionTarget } from '@/domain/permission/enums';
import { ContextService } from '@/global';

@Injectable()
export class PermissionService {
  constructor(private readonly contextService: ContextService) {}

  async getMetadatas() {
    return new PermissionMetadataMap().values.map((metadata) => new PermissionMetadataDTO(metadata));
  }

  checkPermission(permissionTargets: PermissionTarget[]) {
    const userContext = this.contextService.getUser();

    for (const { role } of userContext.roles) {
      for (const permission of role.permissions) {
        const regExp = new RegExp(permission.target.replaceAll('*', '.'));

        for (const permissionTarget of permissionTargets) {
          if (regExp.test(permissionTarget)) {
            return true;
          }
        }
      }
    }

    throw new Exception(PermissionModuleErrorCode.PermissionDenined, HttpStatus.FORBIDDEN);
  }
}
