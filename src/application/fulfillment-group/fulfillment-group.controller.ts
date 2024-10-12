import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { CreateFulfillmentGroupDTO, FulfillmentGroupFulfillmentListDTO, FulfillmentGroupListDTO, UpdateFulfillmentGroupDTO } from './dtos';
import { FulfillmentGroupService } from './fulfillment-group.service';

import { Private } from '@/common';
import { PermissionTarget } from '@/domain/permission/enums';

@ApiTags('풀필먼트 센터 그룹')
@Controller('fulfillment-groups')
export class FulfillmentGroupController {
  constructor(private readonly fulfillmentGroupService: FulfillmentGroupService) {}

  @Get()
  @Private(PermissionTarget.Admin)
  @ApiOperation({ summary: '풀필먼트 센터 그룹 목록 조회' })
  @ApiOkResponse({ type: FulfillmentGroupListDTO })
  async list() {
    return this.fulfillmentGroupService.list();
  }

  @Get('fulfillments')
  @Private(PermissionTarget.FulfillmentAll)
  @ApiOperation({ summary: '풀필먼트 센터 그룹 내 풀필먼트 센터 목록 조회' })
  @ApiOkResponse({ type: FulfillmentGroupFulfillmentListDTO })
  async fulfillments() {
    return this.fulfillmentGroupService.fulfillments();
  }

  @Post()
  @Private(PermissionTarget.Admin)
  @ApiOperation({ summary: '풀필먼트 센터 그룹 생성' })
  @ApiCreatedResponse()
  @ApiBadRequestResponse()
  @ApiConflictResponse()
  async create(@Body() body: CreateFulfillmentGroupDTO) {
    return this.fulfillmentGroupService.create(body);
  }

  @Patch(':id(\\d+)')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Private(PermissionTarget.Admin)
  @ApiOperation({ summary: '풀필먼트 센터 그룹 수정' })
  @ApiNoContentResponse()
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateFulfillmentGroupDTO) {
    return this.fulfillmentGroupService.update(id, body);
  }

  @Delete(':id(\\d+)')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Private(PermissionTarget.Admin)
  @ApiOperation({ summary: '풀필먼트 센터 그룹 삭제' })
  @ApiNoContentResponse()
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.fulfillmentGroupService.delete(id);
  }
}
