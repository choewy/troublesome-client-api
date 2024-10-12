import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreateFulfillmentGroupDTO, FulfillmentGroupListDTO } from './dtos';
import { FulfillmentGroupService } from './fulfillment-group.service';

import { Private } from '@/common';
import { PermissionTarget } from '@/domain/permission/enums';

@Private(PermissionTarget.Admin)
@ApiTags('풀필먼트 센터 그룹')
@Controller('fulfillment-groups')
export class FulfillmentGroupController {
  constructor(private readonly fulfillmentGroupService: FulfillmentGroupService) {}

  @Get()
  @ApiOperation({ summary: '풀필먼트 센터 그룹 목록 조회' })
  @ApiOkResponse({ type: FulfillmentGroupListDTO })
  async list() {
    return this.fulfillmentGroupService.list();
  }

  @Post()
  @ApiOperation({ summary: '풀필먼트 센터 그룹 생성' })
  @ApiCreatedResponse()
  @ApiBadRequestResponse()
  @ApiConflictResponse()
  async create(@Body() body: CreateFulfillmentGroupDTO) {
    return this.fulfillmentGroupService.create(body);
  }
}
