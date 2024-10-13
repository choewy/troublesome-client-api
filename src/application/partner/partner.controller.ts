import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreatePartnerDTO, PartnerListDTO, UpdatePartnerDTO } from './dtos';
import { PartnerService } from './partner.service';

import { Private } from '@/common';
import { PermissionTarget } from '@/domain/permission/enums';

@ApiTags('고객사')
@Controller('partners')
export class PartnerController {
  constructor(private readonly partnerService: PartnerService) {}

  @Get()
  @Private(PermissionTarget.PartnerRead)
  @ApiOperation({ summary: '고객사 목록 조회' })
  @ApiOkResponse({ type: PartnerListDTO })
  async list() {
    return this.partnerService.list();
  }

  @Get(':id(\\d+)')
  @Private(PermissionTarget.FulfillmentRead)
  @ApiOperation({ summary: '고객사 단일 조회' })
  @ApiOkResponse({})
  async detail(@Param('id', ParseIntPipe) id: number) {
    return this.partnerService.detail(id);
  }

  @Post()
  @Private(PermissionTarget.PartnerCreate)
  @ApiOperation({ summary: '고객사 등록' })
  @ApiCreatedResponse()
  async create(@Body() body: CreatePartnerDTO) {
    return this.partnerService.create(body);
  }

  @Patch(':id(\\d+)')
  @Private(PermissionTarget.FulfillmentUpdate)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '고객사 수정' })
  @ApiNoContentResponse()
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdatePartnerDTO) {
    return this.partnerService.update(id, body);
  }

  @Delete(':id(\\d+)')
  @Private(PermissionTarget.FulfillmentDelete)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '고객사 삭제' })
  @ApiNoContentResponse()
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.partnerService.delete(id);
  }
}
