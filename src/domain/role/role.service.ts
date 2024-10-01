import { FulfillmentEntity, PartnerEntity, RoleEntity } from '@choewy/troublesome-entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { PermissionService } from '../permission/permission.service';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
    private readonly permissionService: PermissionService,
  ) {}

  protected getRepository(em?: EntityManager) {
    return em instanceof EntityManager ? em.getRepository(RoleEntity) : this.roleRepository;
  }

  public createDefaultPartnerRoles(partner: PartnerEntity) {
    return [
      this.roleRepository.create({
        name: '관리자(고객사)',
        isEditable: false,
        permissions: this.permissionService.defaultPartnerAdminPermissions,
        partner,
        users: [],
      }),
      this.roleRepository.create({
        name: '사용자(고객사)',
        isEditable: false,
        permissions: this.permissionService.defaultPartnerUserPermissions,
        partner,
        users: [],
      }),
    ];
  }

  public createDefaultFulfillmentRoles(fulfillment: FulfillmentEntity) {
    return [
      this.roleRepository.create({
        name: '관리자(풀필먼트)',
        isEditable: false,
        permissions: this.permissionService.defaultFulfillmentAdminPermissions,
        fulfillment,
        users: [],
      }),
      this.roleRepository.create({
        name: '사용자(풀필먼트)',
        isEditable: false,
        permissions: this.permissionService.defaultFulfillmentUserPermissions,
        fulfillment,
        users: [],
      }),
    ];
  }
}
