import { NumberPKParamDTO } from '@common';
import { ApiAuthHeaders } from '@core';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CourierCompanyService } from './courier-company.service';
import { CourierCompanyDTO, CourierCompanyListDTO, CourierCompanyListQueryDTO, SetCourierCompanyDTO } from './dtos';

@ApiTags('택배사')
@ApiAuthHeaders()
@Controller('courier-company')
export class CourierCompanyController {
  constructor(private readonly courierCompanyService: CourierCompanyService) {}

  @Get()
  @ApiOperation({ summary: '택배사 목록 조회' })
  @ApiOkResponse({ type: CourierCompanyListDTO })
  async getList(@Query() query: CourierCompanyListQueryDTO) {
    return new CourierCompanyListDTO(await this.courierCompanyService.getList(query));
  }

  @Post()
  @ApiOperation({ summary: '택배사 등록' })
  @ApiCreatedResponse()
  async create(@Body() body: SetCourierCompanyDTO) {
    return this.courierCompanyService.create(body);
  }

  @Get(':id(\\d+)')
  @ApiOperation({ summary: '택배사 단일 조회' })
  @ApiOkResponse({ type: CourierCompanyDTO })
  async getById(@Param() param: NumberPKParamDTO) {
    return new CourierCompanyDTO(await this.courierCompanyService.getById(param.id));
  }

  @Patch(':id(\\d+)')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '택배사 수정' })
  @ApiNoContentResponse()
  async update(@Param() param: NumberPKParamDTO, @Body() body: SetCourierCompanyDTO) {
    return this.courierCompanyService.update(param.id, body);
  }

  @Delete(':id(\\d+)')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '택배사 삭제' })
  @ApiNoContentResponse()
  async delete(@Param() param: NumberPKParamDTO) {
    return this.courierCompanyService.delete(param.id);
  }
}
