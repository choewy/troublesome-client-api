import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreatePartnerDTO, PartnerListDTO } from './dtos';
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

  @Post()
  @Private(PermissionTarget.PartnerCreate)
  @ApiOperation({ summary: '고객사 등록' })
  @ApiCreatedResponse()
  async create(@Body() body: CreatePartnerDTO) {
    return this.partnerService.create(body);
  }
}
