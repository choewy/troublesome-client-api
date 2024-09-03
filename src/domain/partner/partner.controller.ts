import { NumberPKParamDTO } from '@common';
import { ApiAuthHeaders } from '@core';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { PartnerDTO, PartnerListDTO, PartnerListQueryDTO, SetPartnerDTO } from './dtos';
import { PartnerService } from './partner.service';

@ApiTags('고객사')
@ApiAuthHeaders()
@Controller('partners')
export class PartnerController {
  constructor(private readonly partnerService: PartnerService) {}

  @Get()
  @ApiOperation({ summary: '고객사 목록 조회' })
  @ApiOkResponse({ type: PartnerListDTO })
  async getList(@Query() query: PartnerListQueryDTO) {
    return new PartnerListDTO(await this.partnerService.getList(query));
  }

  @Post()
  @ApiOperation({ summary: '고객사 등록' })
  @ApiCreatedResponse()
  async create(@Body() body: SetPartnerDTO) {
    return this.partnerService.create(body);
  }

  @Get(':id(\\d+)')
  @ApiOperation({ summary: '고객사 단일 조회' })
  @ApiOkResponse({ type: PartnerDTO })
  async getById(@Param() param: NumberPKParamDTO) {
    return new PartnerDTO(await this.partnerService.getById(param.id));
  }

  @Patch(':id(\\d+)')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '화주사 정보 수정' })
  @ApiNoContentResponse()
  async update(@Param() param: NumberPKParamDTO, @Body() body: SetPartnerDTO) {
    return this.partnerService.update(param.id, body);
  }

  @Delete(':id(\\d+)')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '고객사 삭제' })
  @ApiNoContentResponse()
  async delete(@Param() param: NumberPKParamDTO) {
    return this.partnerService.delete(param.id);
  }
}
