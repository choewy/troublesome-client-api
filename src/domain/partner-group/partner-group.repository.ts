import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { DataSource, EntityManager } from 'typeorm';

import { PartnerGroupEntity } from './partner-group.entity';

import { EntityRepository } from '@/global';

@Injectable()
export class PartnerGroupRepository extends EntityRepository<PartnerGroupEntity> {
  constructor(dataSource: DataSource) {
    super(dataSource, PartnerGroupEntity);
  }

  async findList(skip: number, take: number) {
    return this.getRepository().findAndCount({
      relations: { user: true },
      skip,
      take,
    });
  }

  async findById(id: number) {
    return this.getRepository().findOne({
      relations: { user: true },
      where: { id },
    });
  }

  async insert(args: Pick<PartnerGroupEntity, 'name'>, em?: EntityManager) {
    const partnerGroup = plainToInstance(PartnerGroupEntity, args);
    await this.getRepository(em).insert(partnerGroup);

    return partnerGroup.id;
  }
}
