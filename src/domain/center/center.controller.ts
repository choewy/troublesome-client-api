import { NumberPKParamDTO } from '@common';
import { ApiAuthHeaders } from '@core';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CenterService } from './center.service';
import { CenterDTO, CenterListDTO, CenterListQueryDTO, SetCenterDTO } from './dtos';

@ApiTags('센터')
@ApiAuthHeaders()
@Controller('centers')
export class CenterController {
  constructor(private readonly centerService: CenterService) {}

  @Get()
  @ApiOperation({ summary: '센터 목록 조회' })
  @ApiOkResponse({ type: CenterListDTO })
  async getList(@Query() query: CenterListQueryDTO) {
    return new CenterListDTO(await this.centerService.getList(query));
  }

  @Get(':id(\\d+)')
  @ApiOperation({ summary: '센터 단일 조회' })
  @ApiOkResponse({ type: CenterDTO })
  async getById(@Param() param: NumberPKParamDTO) {
    return new CenterDTO(await this.centerService.getById(param.id));
  }

  @Post()
  @ApiOperation({ summary: '센터 등록' })
  @ApiCreatedResponse()
  async create(@Body() body: SetCenterDTO) {
    return this.centerService.create(body);
  }

  @Patch(':id(\\d+)')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '데포 수정' })
  @ApiNoContentResponse()
  async update(@Param() param: NumberPKParamDTO, @Body() body: SetCenterDTO) {
    return this.centerService.update(param.id, body);
  }

  @Delete(':id(\\d+)')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '센터 삭제' })
  @ApiNoContentResponse()
  async delete(@Param() param: NumberPKParamDTO) {
    return this.centerService.delete(param.id);
  }
}
