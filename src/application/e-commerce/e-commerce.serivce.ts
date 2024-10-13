import { Injectable } from '@nestjs/common';

import { EcommerceChannelRepository } from '@/domain/e-commerce/e-commerce-channel.repository';
import { EcommercePlatformRepository } from '@/domain/e-commerce/e-commerce-platform.repository';

@Injectable()
export class EcommerceService {
  constructor(
    private readonly ecommercePlatformRepository: EcommercePlatformRepository,
    private readonly ecommerceChannelRepository: EcommerceChannelRepository,
  ) {}
}
