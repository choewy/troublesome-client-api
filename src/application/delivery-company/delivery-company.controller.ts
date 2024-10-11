import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { DeliveryCompanyService } from './delivery-company.service';
import { CreateDeliveryCompanyDTO, DeliveryCompanyListDTO } from './dtos';

import { Private } from '@/common';

@Private()
@ApiTags('택배사')
@Controller('delivery-companies')
export class DeliveryCompanyController {
  constructor(private readonly deliveryCompanyService: DeliveryCompanyService) {}

  @Get()
  @ApiOperation({ summary: '택배사 목록 조회' })
  @ApiOkResponse({ type: DeliveryCompanyListDTO })
  async list() {
    return this.deliveryCompanyService.list();
  }

  @Post()
  @ApiOperation({ summary: '택배사 정보 등록' })
  @ApiCreatedResponse()
  async create(@Body() body: CreateDeliveryCompanyDTO) {
    return this.deliveryCompanyService.create(body);
  }

  @Patch(':id(\\d+)')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '택배사 정보 수정' })
  @ApiNoContentResponse()
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: CreateDeliveryCompanyDTO) {
    return this.deliveryCompanyService.update(id, body);
  }

  @Delete(':id(\\d+)')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '택배사 정보 삭제' })
  @ApiNoContentResponse()
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.deliveryCompanyService.delete(id);
  }
}
