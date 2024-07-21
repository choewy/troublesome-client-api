import { NumberPKParamDTO } from '@common';
import { ApiAuthHeaders } from '@core';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { DepotService } from './depot.service';
import { DepotDTO, DepotListDTO, SetDepotDTO } from './dtos';

@ApiTags('데포')
@ApiAuthHeaders()
@Controller('depots')
export class DepotController {
  constructor(private readonly depotService: DepotService) {}

  @Get()
  @ApiOperation({ summary: '데포 목록 조회' })
  @ApiOkResponse({ type: DepotListDTO })
  async getList() {
    return new DepotListDTO(...(await this.depotService.getList()));
  }

  @Get(':id(\\d+)')
  @ApiOperation({ summary: '데포 단일 조회' })
  @ApiOkResponse({ type: DepotDTO })
  async getById(@Param() param: NumberPKParamDTO) {
    return new DepotDTO(await this.depotService.getById(param.id));
  }

  @Post()
  @ApiOperation({ summary: '데포 등록' })
  @ApiCreatedResponse()
  async create(@Body() body: SetDepotDTO) {
    return this.depotService.create(body);
  }

  @Patch(':id(\\d+)')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '데포 수정' })
  @ApiNoContentResponse()
  async update(@Param() param: NumberPKParamDTO, @Body() body: SetDepotDTO) {
    return this.depotService.update(param.id, body);
  }

  @Delete(':id(\\d+)')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '데포 삭제' })
  @ApiNoContentResponse()
  async delete(@Param() param: NumberPKParamDTO) {
    return this.depotService.delete(param.id);
  }
}
