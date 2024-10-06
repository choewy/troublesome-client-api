import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreatePartnerGroupDTO, PartnerGroupListDTO } from './dtos';
import { PartnerGroupService } from './partner-group.service';

import { Private } from '@/common';

// TODO system admin
@Private()
@ApiTags('고객사 그룹')
@Controller('partner-groups')
export class PartnerGroupController {
  constructor(private readonly partnerGroupService: PartnerGroupService) {}

  @Get()
  @ApiOperation({ summary: '고객사 그룹 목록 조회' })
  @ApiOkResponse({ type: PartnerGroupListDTO })
  async getList() {
    return this.partnerGroupService.getList();
  }

  @Post()
  @ApiOperation({ summary: '고객사 그룹 및 관리자 계정 생성' })
  @ApiCreatedResponse()
  async create(@Body() body: CreatePartnerGroupDTO) {
    return this.partnerGroupService.create(body);
  }
}
