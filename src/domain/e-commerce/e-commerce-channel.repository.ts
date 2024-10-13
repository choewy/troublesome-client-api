import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { EcommerceChannelEntity } from './e-commerce-channel.entity';

import { EntityRepository } from '@/global';

@Injectable()
export class EcommerceChannelRepository extends EntityRepository<EcommerceChannelEntity> {
  constructor(dataSource: DataSource) {
    super(dataSource, EcommerceChannelEntity);
  }
}
