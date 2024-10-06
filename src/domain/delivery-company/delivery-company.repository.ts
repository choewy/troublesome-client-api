import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { DeliveryCompanyEntity } from './delivery-company.entity';

import { EntityRepository } from '@/global';

@Injectable()
export class DeliveryCompanyRepository extends EntityRepository<DeliveryCompanyEntity> {
  constructor(dataSource: DataSource) {
    super(dataSource, DeliveryCompanyEntity);
  }

  async findList(skip: number, take: number) {
    return this.getRepository().findAndCount({ take, skip });
  }

  async findById(id: number) {
    return this.getRepository().findOneBy({ id });
  }

  async findByDefault() {
    return this.getRepository().findOneBy({ isDefault: true });
  }
}
