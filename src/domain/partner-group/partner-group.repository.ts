import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { PartnerGroupEntity } from './entities/partner-group.entity';

import { EntityRepository } from '@/global';

@Injectable()
export class PartnerGroupService extends EntityRepository<PartnerGroupEntity> {
  constructor(dataSource: DataSource) {
    super(dataSource, PartnerGroupEntity);
  }
}
