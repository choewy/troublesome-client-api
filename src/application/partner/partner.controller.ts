import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreatePartnerDTO, PartnerListDTO } from './dtos';
import { PartnerService } from './partner.service';

import { Private, PrivateOptions } from '@/common';

@Private()
@ApiTags('고객사')
@Controller('partners')
export class PartnerController {
  constructor(private readonly partnerService: PartnerService) {}

  @Get()
  @ApiOperation({ summary: '고객사 목록 조회' })
  @ApiOkResponse({ type: PartnerListDTO })
  async getList() {
    return this.partnerService.getList();
  }

  @Private(PrivateOptions.PartnerGroup)
  @Post()
  @ApiOperation({ summary: '고객사 등록' })
  @ApiCreatedResponse()
  async create(@Body() body: CreatePartnerDTO) {
    return this.partnerService.create(body);
  }
}
