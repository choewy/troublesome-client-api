import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CourierCompanyService } from './courier-company.service';
import { CourierCompanyListDTO } from './dtos';

@ApiTags('택배사')
@Controller('courier-company')
export class CourierCompanyController {
  constructor(private readonly courierCompanyService: CourierCompanyService) {}

  @Get('list')
  @ApiOperation({ summary: '택배사 목록 조회' })
  @ApiOkResponse({ type: CourierCompanyListDTO })
  async getList() {
    return this.courierCompanyService.getList();
  }
}
