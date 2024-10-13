import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { EcommercePlatformEntity } from './e-commerce-platform.entity';

import { EntityRepository } from '@/global';

@Injectable()
export class EcommercePlatformRepository extends EntityRepository<EcommercePlatformEntity> {
  constructor(dataSource: DataSource) {
    super(dataSource, EcommercePlatformEntity);
  }
}
