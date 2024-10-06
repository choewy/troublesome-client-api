import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { DeliveryCompanyService } from './delivery-company.service';
import { DeliveryCompanyListDTO } from './dtos';

import { Private } from '@/common';

@Private()
@ApiTags('택배사')
@Controller('delivery-companies')
export class DeliveryCompanyController {
  constructor(private readonly deliveryCompanyService: DeliveryCompanyService) {}

  @Get()
  @ApiOperation({ summary: '택배사 목록 조회' })
  @ApiOkResponse({ type: DeliveryCompanyListDTO })
  async getList() {
    return this.deliveryCompanyService.getList();
  }
}
