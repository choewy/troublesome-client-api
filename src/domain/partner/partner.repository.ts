import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { PartnerEntity } from './entities/partner.entity';

import { EntityRepository } from '@/global';

@Injectable()
export class PartnerService extends EntityRepository<PartnerEntity> {
  constructor(dataSource: DataSource) {
    super(dataSource, PartnerEntity);
  }
}
