import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { DataSource, DeepPartial, EntityManager } from 'typeorm';

import { UserEntity } from './user.entity';

import { EntityRepository } from '@/global';

@Injectable()
export class UserRepository extends EntityRepository<UserEntity> {
  constructor(dataSource: DataSource) {
    super(dataSource, UserEntity);
  }

  async hasById(id: number) {
    return (await this.getRepository().countBy({ id })) > 0;
  }

  async findById(id: number) {
    return this.getRepository().findOne({
      relations: {
        partnerGroup: { partners: true },
        partner: true,
        fulfillment: true,
        roles: { role: { permissions: true } },
      },
      where: { id },
    });
  }

  async findByEmail(email: string) {
    return this.getRepository().findOne({
      relations: {
        partnerGroup: { partners: true },
        partner: true,
        fulfillment: true,
        roles: { role: { permissions: true } },
      },
      where: { email },
    });
  }

  async hasEmail(email: string) {
    return this.getRepository().existsBy({ email });
  }

  async insert(
    args: Pick<UserEntity, 'email' | 'password' | 'name'> & Partial<Pick<UserEntity, 'partnerGroupId' | 'partnerId' | 'fulfillmentId'>>,
    em?: EntityManager,
  ) {
    const user = plainToInstance(UserEntity, args);
    await this.getRepository(em).insert(user);

    return user.id;
  }

  async save(args: DeepPartial<UserEntity>, em?: EntityManager) {
    const userRepository = this.getRepository(em);
    const user = await userRepository.save(userRepository.create(args));

    return user;
  }
}
