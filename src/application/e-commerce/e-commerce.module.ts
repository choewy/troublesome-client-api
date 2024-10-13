import { Module } from '@nestjs/common';

import { EcommerceController } from './e-commerce.controller';
import { EcommerceService } from './e-commerce.serivce';

import { EcommerceChannelRepository } from '@/domain/e-commerce/e-commerce-channel.repository';
import { EcommercePlatformRepository } from '@/domain/e-commerce/e-commerce-platform.repository';

@Module({
  controllers: [EcommerceController],
  providers: [EcommerceService, EcommercePlatformRepository, EcommerceChannelRepository],
})
export class EcommerceModule {}
