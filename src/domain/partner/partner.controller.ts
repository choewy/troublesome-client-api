import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PartnerService } from './partner.service';

import { Private } from '@/common';

@Private()
@ApiTags('고객사')
@Controller('partners')
export class PartnerController {
  constructor(private readonly partnerService: PartnerService) {}
}
