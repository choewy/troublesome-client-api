import { Injectable } from '@nestjs/common';
import { hash } from 'argon2';
import { DataSource, DeepPartial, EntityManager, Not } from 'typeorm';

import { FulfillmentEntity } from './fulfillment.entity';
import { DeliveryCompanySettingEntity } from '../delivery-company-setting/delivery-company-setting.entity';
import { FULFILLMENT_MANAGER_PERMISSION_TARGETS, FULFILLMENT_USER_PERMISSION_TARGETS } from '../permission/constants';
import { PermissionEntity } from '../permission/permission.entity';
import { RoleEntity } from '../role/role.entity';
import { UserType } from '../user/enums';
import { UserRolesEntity } from '../user/user-roles.entity';
import { UserEntity } from '../user/user.entity';

import { EntityRepository } from '@/global';

@Injectable()
export class FulfillmentRepository extends EntityRepository<FulfillmentEntity> {
  constructor(dataSource: DataSource) {
    super(dataSource, FulfillmentEntity);
  }

  async hasById(id: number) {
    return (await this.getRepository().countBy({ id })) > 0;
  }

  async hasByPlantCode(plantCode: string, omitId?: number) {
    const id = omitId ? Not(omitId) : undefined;

    return (await this.getRepository().countBy({ plantCode, id })) > 0;
  }

  async findList(skip: number, take: number) {
    return this.getRepository().findAndCount({
      relations: { deliveryCompanySettings: { deliveryCompany: true } },
      where: { deliveryCompanySettings: { isDefault: true } },
      skip,
      take,
    });
  }

  async findListByGroupId(fulfillmentGroupId: number) {
    return this.getRepository().findAndCount({
      where: { fulfillmentGroupId },
    });
  }

  async findContextById(id: number) {
    return this.getRepository().findOne({
      where: { id },
      select: { id: true, name: true, fulfillmentGroupId: true },
    });
  }

  async findById(id: number) {
    return this.getRepository().findOne({
      relations: { deliveryCompanySettings: { deliveryCompany: true } },
      where: { id, deliveryCompanySettings: { isDefault: true } },
    });
  }

  async insertByGroupManager(
    groupManager: Pick<UserEntity, 'id' | 'type'>,
    fulfillmentManager: DeepPartial<UserEntity>,
    args: DeepPartial<FulfillmentEntity>,
    em?: EntityManager,
  ) {
    const transactional = async (em: EntityManager) => {
      const fulfillmentRepository = em.getRepository(FulfillmentEntity);
      const fulfillment = fulfillmentRepository.create(args);
      await fulfillmentRepository.insert(fulfillment);

      const managerIds = [];

      if (groupManager.type === UserType.FulfillmentGroupManager) {
        managerIds.push(groupManager.id);
      }

      const userRepository = em.getRepository(UserEntity);
      const password = await hash(fulfillmentManager.password);
      const user = userRepository.create({ ...fulfillmentManager, type: UserType.FulfillmentManager, password, fulfillment });
      await userRepository.insert(user);

      managerIds.push(user.id);

      if (args.deliveryCompanySettings) {
        const deliveryCompanySettingRepository = em.getRepository(DeliveryCompanySettingEntity);
        const deliveryCompanySettings = deliveryCompanySettingRepository.create(
          args.deliveryCompanySettings.map((args: DeepPartial<DeliveryCompanySettingEntity>) => ({ ...args, fulfillment })),
        );
        await deliveryCompanySettingRepository.insert(deliveryCompanySettings);
      }

      const roleRepository = em.getRepository(RoleEntity);
      const roleOfManager = roleRepository.create({ name: '풀필먼트 센터 관리자', isEditable: false, fulfillment });
      const roleOfUser = roleRepository.create({ name: '풀필먼트 센터 사용자', isEditable: false, fulfillment });
      await roleRepository.insert([roleOfManager, roleOfUser]);

      const permissionRepository = em.getRepository(PermissionEntity);
      await permissionRepository.insert([
        ...FULFILLMENT_MANAGER_PERMISSION_TARGETS.map((target) => ({ target, role: roleOfManager })),
        ...FULFILLMENT_USER_PERMISSION_TARGETS.map((target) => ({ target, role: roleOfUser })),
      ]);

      if (managerIds.length > 0) {
        const userRolesRepository = em.getRepository(UserRolesEntity);
        await userRolesRepository.insert(managerIds.map((userId) => ({ userId, role: roleOfManager })));
      }
    };

    return em ? transactional(em) : this.dataSource.transaction(transactional);
  }

  async save(args: DeepPartial<FulfillmentEntity>, em?: EntityManager) {
    return this.getRepository(em).save(args);
  }

  async update(id: number, args: DeepPartial<FulfillmentEntity>, em?: EntityManager) {
    return this.getRepository(em).update(id, args);
  }
}
