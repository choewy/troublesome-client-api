import { PartnerGroupEntity } from '@choewy/troublesome-entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ContextService } from '@/global';

@Injectable()
export class PartnerGroupService {
  constructor(
    @InjectRepository(PartnerGroupEntity)
    private readonly partnerGroupRepository: Repository<PartnerGroupEntity>,
    private readonly contextService: ContextService,
  ) {}
}
