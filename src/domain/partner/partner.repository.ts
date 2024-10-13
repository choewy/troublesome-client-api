import { Injectable } from '@nestjs/common';
import { hash } from 'argon2';
import { DataSource, DeepPartial, EntityManager } from 'typeorm';

import { PartnerEntity } from './partner.entity';
import { PARTNER_MANAGER_PERMISSION_TARGETS, PARTNER_USER_PERMISSION_TARGETS } from '../permission/constants';
import { PermissionEntity } from '../permission/permission.entity';
import { RoleEntity } from '../role/role.entity';
import { UserType } from '../user/enums';
import { UserRolesEntity } from '../user/user-roles.entity';
import { UserEntity } from '../user/user.entity';

import { EntityRepository } from '@/global';

@Injectable()
export class PartnerRepository extends EntityRepository<PartnerEntity> {
  constructor(dataSource: DataSource) {
    super(dataSource, PartnerEntity);
  }

  async findList(skip: number, take: number) {
    return this.getRepository().findAndCount({
      skip,
      take,
    });
  }

  async findListByGroupId(partnerGroupId: number) {
    return this.getRepository().findAndCount({
      where: { partnerGroupId },
    });
  }

  async findContextById(id: number) {
    return this.getRepository().findOne({
      where: { id },
      select: { id: true, name: true, partnerGroupId: true },
    });
  }

  async findById(id: number) {
    return this.getRepository().findOne({ where: { id } });
  }

  async insertByGroupManager(
    groupManager: Pick<UserEntity, 'id' | 'type'>,
    partnerManager: DeepPartial<UserEntity>,
    args: DeepPartial<PartnerEntity>,
    em?: EntityManager,
  ) {
    const transactional = async (em: EntityManager) => {
      const partnerRepository = em.getRepository(PartnerEntity);
      const partner = partnerRepository.create(args);
      await partnerRepository.insert(partner);

      const managerIds = [];

      if (groupManager.type === UserType.PartnerGroupManager) {
        managerIds.push(groupManager.id);
      }

      const userRepository = em.getRepository(UserEntity);
      const password = await hash(partnerManager.password);
      const user = userRepository.create({ ...partnerManager, type: UserType.PartnerManager, password, partner });
      await userRepository.insert(user);

      managerIds.push(user.id);

      const roleRepository = em.getRepository(RoleEntity);
      const roleOfManager = roleRepository.create({ name: '고객사 관리자', isEditable: false, partner });
      const roleOfUser = roleRepository.create({ name: '고객사 사용자', isEditable: false, partner });
      await roleRepository.insert([roleOfManager, roleOfUser]);

      const permissionRepository = em.getRepository(PermissionEntity);
      await permissionRepository.insert([
        ...PARTNER_MANAGER_PERMISSION_TARGETS.map((target) => ({ target, role: roleOfManager })),
        ...PARTNER_USER_PERMISSION_TARGETS.map((target) => ({ target, role: roleOfUser })),
      ]);

      if (managerIds.length > 0) {
        const userRolesRepository = em.getRepository(UserRolesEntity);
        await userRolesRepository.insert(managerIds.map((userId) => ({ userId, role: roleOfManager })));
      }
    };

    return em ? transactional(em) : this.dataSource.transaction(transactional);
  }
}
