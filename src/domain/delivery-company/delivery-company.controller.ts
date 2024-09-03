import { NumberPKParamDTO } from '@common';
import { ApiAuthHeaders } from '@core';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { DeliveryCompanyService } from './delivery-company.service';
import { DeliveryCompanyDTO, DeliveryCompanyListDTO, DeliveryCompanyListQueryDTO, SetDeliveryCompanyDTO } from './dtos';

@ApiTags('택배사')
@ApiAuthHeaders()
@Controller('delivery-companies')
export class DeliveryCompanyController {
  constructor(private readonly deliveryCompanyService: DeliveryCompanyService) {}

  @Get()
  @ApiOperation({ summary: '택배사 목록 조회' })
  @ApiOkResponse({ type: DeliveryCompanyListDTO })
  async getList(@Query() query: DeliveryCompanyListQueryDTO) {
    return new DeliveryCompanyListDTO(await this.deliveryCompanyService.getList(query));
  }

  @Post()
  @ApiOperation({ summary: '택배사 등록' })
  @ApiCreatedResponse()
  async create(@Body() body: SetDeliveryCompanyDTO) {
    return this.deliveryCompanyService.create(body);
  }

  @Get(':id(\\d+)')
  @ApiOperation({ summary: '택배사 단일 조회' })
  @ApiOkResponse({ type: DeliveryCompanyDTO })
  async getById(@Param() param: NumberPKParamDTO) {
    return new DeliveryCompanyDTO(await this.deliveryCompanyService.getById(param.id));
  }

  @Patch(':id(\\d+)')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '택배사 수정' })
  @ApiNoContentResponse()
  async update(@Param() param: NumberPKParamDTO, @Body() body: SetDeliveryCompanyDTO) {
    return this.deliveryCompanyService.update(param.id, body);
  }

  @Delete(':id(\\d+)')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '택배사 삭제' })
  @ApiNoContentResponse()
  async delete(@Param() param: NumberPKParamDTO) {
    return this.deliveryCompanyService.delete(param.id);
  }
}
