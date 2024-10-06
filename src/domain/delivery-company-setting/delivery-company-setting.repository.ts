import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';

import { DeliveryCompanySettingEntity } from './delivery-company-setting.entity';

import { EntityRepository } from '@/global';

@Injectable()
export class DeliveryCompanySettingRepository extends EntityRepository<DeliveryCompanySettingEntity> {
  constructor(dataSource: DataSource) {
    super(dataSource, DeliveryCompanySettingEntity);
  }

  async insert(
    args: Pick<DeliveryCompanySettingEntity, 'fulfillmentId' | 'deliveryCompanyId'> &
      Partial<Pick<DeliveryCompanySettingEntity, 'isDefault'>>,
    em?: EntityManager,
  ) {
    await this.getRepository(em).upsert(args, { conflictPaths: { fulfillmentId: true, deliveryCompanyId: true } });
  }
}
