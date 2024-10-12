import { HttpStatus, Injectable } from '@nestjs/common';

import { PermissionModuleErrorCode } from './constants';
import { PermissionMetadataDTO } from './dtos';
import { PermissionMetadataMap } from './implements';

import { Exception } from '@/core';
import { PermissionTarget } from '@/domain/permission/enums';
import { UserEntity } from '@/domain/user/user.entity';
import { ContextService } from '@/global';

@Injectable()
export class PermissionService {
  constructor(private readonly contextService: ContextService) {}

  async getMetadatas() {
    return new PermissionMetadataMap().values.map((metadata) => new PermissionMetadataDTO(metadata));
  }

  checkPermission(permissionTarget: PermissionTarget) {
    const user = this.contextService.getUser<UserEntity>();

    for (const { role } of user.roles) {
      for (const permission of role.permissions) {
        const regExp = new RegExp(permission.target.replaceAll('*', '.'));

        if (regExp.test(permissionTarget)) {
          return true;
        }
      }
    }

    throw new Exception(PermissionModuleErrorCode.PermissionDenined, HttpStatus.FORBIDDEN);
  }
}
