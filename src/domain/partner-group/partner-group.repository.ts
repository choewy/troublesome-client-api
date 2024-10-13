import { Injectable } from '@nestjs/common';
import { hash } from 'argon2';
import { DataSource, DeepPartial, EntityManager } from 'typeorm';

import { PartnerGroupEntity } from './partner-group.entity';
import { PartnerEntity } from '../partner/partner.entity';
import { RoleDefaultPK } from '../role/enums';
import { UserType } from '../user/enums';
import { UserRolesEntity } from '../user/user-roles.entity';
import { UserEntity } from '../user/user.entity';

import { EntityRepository } from '@/global';

@Injectable()
export class PartnerGroupRepository extends EntityRepository<PartnerGroupEntity> {
  constructor(dataSource: DataSource) {
    super(dataSource, PartnerGroupEntity);
  }

  async hasById(id: number) {
    return (await this.getRepository().countBy({ id })) > 0;
  }

  async findList(skip: number, take: number) {
    return this.getRepository().findAndCount({
      relations: { manager: true, partners: true },
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

  async findById(id: number) {
    return this.getRepository().findOne({
      relations: { manager: true },
      where: { id },
    });
  }

  async insert(args: DeepPartial<PartnerGroupEntity>, em?: EntityManager) {
    const transactional = async (em: EntityManager) => {
      const partnerGroupRepository = em.getRepository(PartnerGroupEntity);
      const partnerGroup = partnerGroupRepository.create({ name: args.name });
      await partnerGroupRepository.insert(partnerGroup);

      if (args.manager) {
        const userRepository = em.getRepository(UserEntity);
        const password = await hash(args.manager.password);
        const user = userRepository.create({ ...args.manager, type: UserType.PartnerGroupManager, password, partnerGroup });
        await userRepository.insert(user);

        const userRolesRepository = em.getRepository(UserRolesEntity);
        await userRolesRepository.insert({ user, roleId: RoleDefaultPK.PartnerGroupManager });
      }
    };

    return em ? transactional(em) : this.dataSource.transaction(transactional);
  }

  async update(id: number, args: DeepPartial<PartnerGroupEntity>, em?: EntityManager) {
    await this.getRepository(em).update(id, args);
  }

  async delete(id: number, em?: EntityManager) {
    const transactional = async (em: EntityManager) => {
      await this.getRepository(em).softDelete(id);
      await this.pickRepository(PartnerEntity, em).softDelete({ partnerGroupId: id });
      await this.pickRepository(UserEntity, em).softDelete({ partnerGroupId: id });
    };

    return em ? transactional(em) : this.dataSource.transaction(transactional);
  }
}
