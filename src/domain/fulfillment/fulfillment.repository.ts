import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { DataSource, EntityManager } from 'typeorm';

import { FulfillmentEntity } from './fulfillment.entity';

import { EntityRepository } from '@/global';

@Injectable()
export class FulfillmentRepository extends EntityRepository<FulfillmentEntity> {
  constructor(dataSource: DataSource) {
    super(dataSource, FulfillmentEntity);
  }

  async findList(skip: number, take: number) {
    return this.getRepository()
      .createQueryBuilder('fulfillment')
      .leftJoinAndMapMany(
        'fulfillment.deliveryCompanySettings',
        'fulfillment.deliveryCompanySettings',
        'deliveryCompanySettings',
        'deliveryCompanySettings.isDefault = 1',
      )
      .leftJoinAndMapOne('deliveryCompanySettings.deliveryCompany', 'deliveryCompanySettings.deliveryCompany', 'deliveryCompany')
      .skip(skip)
      .take(take)
      .getManyAndCount();
  }

  async insert(
    args: Pick<FulfillmentEntity, 'name' | 'plantCode'> & Partial<Pick<FulfillmentEntity, 'zipCode' | 'address' | 'addressDetail'>>,
    em?: EntityManager,
  ) {
    const fulfillment = plainToInstance(FulfillmentEntity, {
      name: args.name,
      plantCode: args.plantCode,
      zipCode: args.zipCode,
      address: args.address,
      addressDetail: args.addressDetail,
    });

    await this.getRepository(em).insert(fulfillment);

    return fulfillment.id;
  }
}
