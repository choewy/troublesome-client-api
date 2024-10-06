import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { DataSource, EntityManager } from 'typeorm';

import { UserEntity } from './entities/user.entity';

import { EntityRepository } from '@/global';

@Injectable()
export class UserRepository extends EntityRepository<UserEntity> {
  constructor(dataSource: DataSource) {
    super(dataSource, UserEntity);
  }

  async findById(id: number) {
    return this.getRepository().findOne({
      relations: {
        partnerGroup: { partners: true },
        partner: true,
        fulfillment: true,
        role: { permissions: true },
      },
      where: { id },
    });
  }

  async findByEmail(email: string) {
    return this.getRepository().findOneBy({ email });
  }

  async hasEmail(email: string) {
    return this.getRepository().existsBy({ email });
  }

  async insert(
    args: Pick<UserEntity, 'email' | 'password' | 'name'> & Partial<Pick<UserEntity, 'partnerId' | 'fulfillmentId'>>,
    em?: EntityManager,
  ) {
    const user = plainToInstance(UserEntity, args);
    await this.getRepository(em).insert(user);

    return user.id;
  }
}
