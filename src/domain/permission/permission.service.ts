import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PermissionLevel, PermissionTarget } from './constants/enums';
import { PermissionEntity } from './entities/permission.entity';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(PermissionEntity)
    private readonly permissionRepository: Repository<PermissionEntity>,
  ) {}

  public get defaultPartnerAdminPermissions() {
    return [
      this.permissionRepository.create({
        target: PermissionTarget.Partner,
        level: PermissionLevel.Update,
      }),
      this.permissionRepository.create({
        target: PermissionTarget.User,
        level: PermissionLevel.Update,
      }),
    ];
  }

  public get defaultPartnerUserPermissions() {
    return [
      this.permissionRepository.create({
        target: PermissionTarget.Partner,
        level: PermissionLevel.Read,
      }),
      this.permissionRepository.create({
        target: PermissionTarget.User,
        level: PermissionLevel.Read,
      }),
    ];
  }

  public get defaultFulfillmentAdminPermissions() {
    return [
      this.permissionRepository.create({
        target: PermissionTarget.Fulfillment,
        level: PermissionLevel.Update,
      }),
      this.permissionRepository.create({
        target: PermissionTarget.User,
        level: PermissionLevel.Update,
      }),
    ];
  }

  public get defaultFulfillmentUserPermissions() {
    return [
      this.permissionRepository.create({
        target: PermissionTarget.Fulfillment,
        level: PermissionLevel.Read,
      }),
      this.permissionRepository.create({
        target: PermissionTarget.User,
        level: PermissionLevel.Read,
      }),
    ];
  }
}
