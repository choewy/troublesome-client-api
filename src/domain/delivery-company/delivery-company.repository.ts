import { Injectable } from '@nestjs/common';
import { DataSource, Not } from 'typeorm';

import { DeliveryCompanyEntity } from './delivery-company.entity';

import { EntityRepository } from '@/global';

@Injectable()
export class DeliveryCompanyRepository extends EntityRepository<DeliveryCompanyEntity> {
  constructor(dataSource: DataSource) {
    super(dataSource, DeliveryCompanyEntity);
  }

  async hasById(id: number) {
    return (await this.getRepository().countBy({ id })) > 0;
  }

  async hasByAlias(alias: string, omitId?: number) {
    const id = omitId ? Not(omitId) : undefined;

    return (await this.getRepository().countBy({ alias, id })) > 0;
  }

  async findList(skip: number, take: number) {
    return this.getRepository().findAndCount({ take, skip });
  }

  async findById(id: number) {
    return this.getRepository().findOneBy({ id });
  }
}
