import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreateFulfillmentDTO, FulfillmentListDTO } from './dtos';
import { FulfillmentService } from './fulfillment.service';

import { Private } from '@/common';

@Private()
@ApiTags('풀필먼트 센터')
@Controller('fulfillments')
export class FulfillmentController {
  constructor(private readonly fulfillmentService: FulfillmentService) {}

  @Get()
  @ApiOperation({ summary: '풀필먼트 센터 목록 조회' })
  @ApiOkResponse({ type: FulfillmentListDTO })
  async getList() {
    return this.fulfillmentService.getList();
  }

  @Post()
  @ApiOperation({ summary: '풀필먼트 센터 등록' })
  @ApiCreatedResponse()
  async create(@Body() body: CreateFulfillmentDTO) {
    return this.fulfillmentService.create(body);
  }
}
