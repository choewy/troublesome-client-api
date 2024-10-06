import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { DataSource, EntityManager } from 'typeorm';

import { PartnerEntity } from './partner.entity';

import { EntityRepository } from '@/global';

@Injectable()
export class PartnerRepository extends EntityRepository<PartnerEntity> {
  constructor(dataSource: DataSource) {
    super(dataSource, PartnerEntity);
  }

  async findList(skip: number, take: number) {
    return this.getRepository().findAndCount({ skip, take });
  }

  async insert(args: Pick<PartnerEntity, 'name' | 'partnerGroupId'>, em?: EntityManager) {
    const partner = plainToInstance(PartnerEntity, args);
    await this.getRepository(em).insert(partner);

    return partner.id;
  }
}
