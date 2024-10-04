import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PartnerGroupEntity } from './entities/partner-group.entity';

import { ContextService } from '@/global';

@Injectable()
export class PartnerGroupService {
  constructor(
    @InjectRepository(PartnerGroupEntity)
    private readonly partnerGroupRepository: Repository<PartnerGroupEntity>,
    private readonly contextService: ContextService,
  ) {}
}
