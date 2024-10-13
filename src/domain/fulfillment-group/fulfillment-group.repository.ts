import { Injectable } from '@nestjs/common';
import { hash } from 'argon2';
import { DataSource, DeepPartial, EntityManager } from 'typeorm';

import { FulfillmentGroupEntity } from './fulfillment-group.entity';
import { FulfillmentEntity } from '../fulfillment/fulfillment.entity';
import { RoleDefaultPK } from '../role/enums';
import { UserType } from '../user/enums';
import { UserRolesEntity } from '../user/user-roles.entity';
import { UserEntity } from '../user/user.entity';

import { EntityRepository } from '@/global';

@Injectable()
export class FulfillmentGroupRepository extends EntityRepository<FulfillmentGroupEntity> {
  constructor(dataSource: DataSource) {
    super(dataSource, FulfillmentGroupEntity);
  }

  async hasById(id: number) {
    return (await this.getRepository().countBy({ id })) > 0;
  }

  async findList(skip: number, take: number) {
    return this.getRepository().findAndCount({
      relations: { manager: true, fulfillments: true },
      skip,
      take,
    });
  }

  async findContextById(id: number) {
    return this.getRepository().findOne({
      where: { id },
      select: { id: true, name: true },
    });
  }

  async insert(args: DeepPartial<FulfillmentGroupEntity>, em?: EntityManager) {
    const transactional = async (em: EntityManager) => {
      const fulfillmentGroupRepository = em.getRepository(FulfillmentGroupEntity);
      const fulfillmentGroup = fulfillmentGroupRepository.create({ name: args.name });
      await fulfillmentGroupRepository.insert(fulfillmentGroup);

      if (args.manager) {
        const password = await hash(args.manager.password);

        const userRepository = em.getRepository(UserEntity);
        const user = userRepository.create({ ...args.manager, type: UserType.FulfillmentGroupManager, password, fulfillmentGroup });
        await userRepository.insert(user);

        const userRolesRepository = em.getRepository(UserRolesEntity);
        await userRolesRepository.insert({ user, roleId: RoleDefaultPK.FulfillmentGroupManager });
      }
    };

    return em ? transactional(em) : this.dataSource.transaction(transactional);
  }

  async update(id: number, args: DeepPartial<FulfillmentGroupEntity>, em?: EntityManager) {
    await this.getRepository(em).update(id, args);
  }

  async delete(id: number, em?: EntityManager) {
    const transactional = async (em: EntityManager) => {
      await this.getRepository(em).softDelete(id);
      await this.pickRepository(FulfillmentEntity, em).softDelete({ fulfillmentGroupId: id });
      await this.pickRepository(UserEntity, em).softDelete({ fulfillmentGroupId: id });
    };

    return em ? transactional(em) : this.dataSource.transaction(transactional);
  }
}
