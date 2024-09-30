import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PartnerGroupService } from './partner-group.service';

import { Private } from '@/common';

@Private()
@ApiTags('고객사 그룹')
@Controller('partner-groups')
export class PartnerGroupController {
  constructor(private readonly partnerGroupService: PartnerGroupService) {}
}
