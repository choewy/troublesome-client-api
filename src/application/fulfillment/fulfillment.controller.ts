import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreateFulfillmentDTO, FulfillmentListDTO, UpdateFulfillmentDTO } from './dtos';
import { FulfillmentService } from './fulfillment.service';

import { Private } from '@/common';
import { PermissionTarget } from '@/domain/permission/enums';

@ApiTags('풀필먼트 센터')
@Controller('fulfillments')
export class FulfillmentController {
  constructor(private readonly fulfillmentService: FulfillmentService) {}

  @Get()
  @Private(PermissionTarget.FulfillmentRead)
  @ApiOperation({ summary: '풀필먼트 센터 목록 조회' })
  @ApiOkResponse({ type: FulfillmentListDTO })
  async list() {
    return this.fulfillmentService.list();
  }

  @Get(':id(\\d+)')
  @Private(PermissionTarget.FulfillmentRead)
  @ApiOperation({ summary: '풀필먼트 센터 단일 조회' })
  @ApiOkResponse({})
  async detail(@Param('id', ParseIntPipe) id: number) {
    return this.fulfillmentService.detail(id);
  }

  @Post()
  @Private(PermissionTarget.FulfillmentCreate)
  @ApiOperation({ summary: '풀필먼트 센터 등록' })
  @ApiCreatedResponse()
  async create(@Body() body: CreateFulfillmentDTO) {
    return this.fulfillmentService.create(body);
  }

  @Patch(':id(\\d+)')
  @Private(PermissionTarget.FulfillmentUpdate)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '풀필먼트 센터 수정' })
  @ApiNoContentResponse()
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateFulfillmentDTO) {
    return this.fulfillmentService.update(id, body);
  }

  @Delete(':id(\\d+)')
  @Private(PermissionTarget.FulfillmentDelete)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '풀필먼트 센터 삭제' })
  @ApiNoContentResponse()
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.fulfillmentService.delete(id);
  }
}
