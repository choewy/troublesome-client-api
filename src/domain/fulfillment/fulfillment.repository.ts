import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { DataSource, DeepPartial, EntityManager, Not } from 'typeorm';

import { FulfillmentEntity } from './fulfillment.entity';

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

  async save(args: DeepPartial<FulfillmentEntity>, em?: EntityManager) {
    return this.getRepository(em).save(args);
  }

  async update(id: number, args: DeepPartial<FulfillmentEntity>, em?: EntityManager) {
    return this.getRepository(em).update(id, args);
  }
}
