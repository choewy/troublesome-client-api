import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreatePartnerGroupDTO, PartnerGroupListDTO, PartnerGroupPartnerListDTO, UpdatePartnerGroupDTO } from './dtos';
import { PartnerGroupService } from './partner-group.service';

import { Private } from '@/common';
import { PermissionTarget } from '@/domain/permission/enums';

@ApiTags('고객사 그룹')
@Controller('partner-groups')
export class PartnerGroupController {
  constructor(private readonly partnerGroupService: PartnerGroupService) {}

  @Get()
  @Private(PermissionTarget.Admin)
  @ApiOperation({ summary: '고객사 그룹 목록 조회' })
  @ApiOkResponse({ type: PartnerGroupListDTO })
  async list() {
    return this.partnerGroupService.list();
  }

  @Get('partners')
  @Private(PermissionTarget.PartnerAll)
  @ApiOperation({ summary: '고객사 그룹 내 고객사 목록 조회' })
  @ApiOkResponse({ type: PartnerGroupPartnerListDTO })
  async partners() {
    return this.partnerGroupService.partners();
  }

  @Post()
  @Private(PermissionTarget.Admin)
  @ApiOperation({ summary: '고객사 그룹 생성' })
  @ApiCreatedResponse()
  async create(@Body() body: CreatePartnerGroupDTO) {
    return this.partnerGroupService.create(body);
  }

  @Patch(':id(\\d+)')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Private(PermissionTarget.Admin)
  @ApiOperation({ summary: '고객사 그룹 수정' })
  @ApiNoContentResponse()
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdatePartnerGroupDTO) {
    return this.partnerGroupService.update(id, body);
  }

  @Delete(':id(\\d+)')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Private(PermissionTarget.Admin)
  @ApiOperation({ summary: '고객사 그룹 삭제' })
  @ApiNoContentResponse()
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.partnerGroupService.delete(id);
  }
}
