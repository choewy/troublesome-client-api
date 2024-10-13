import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { EcommercePlatformListDTO } from './dtos';
import { EcommerceService } from './e-commerce.serivce';

import { Private } from '@/common';
import { PermissionTarget } from '@/domain/permission/enums';

@Private()
@ApiTags('E-Commerce')
@Controller('e-commerce')
export class EcommerceController {
  constructor(private readonly ecommerceSerivce: EcommerceService) {}

  @Get('platforms')
  @ApiOperation({ summary: 'e-commerce 플랫폼 목록 조회' })
  @ApiOkResponse({ type: EcommercePlatformListDTO })
  async listPlatform() {
    // TODO
    return;
  }

  @Post('platforms')
  @Private(PermissionTarget.Admin)
  async createPlatform() {
    // TODO
    return;
  }

  @Patch('platforms/:id(\\d+)')
  @Private(PermissionTarget.Admin)
  async updatePlatform() {
    // TODO
    return;
  }

  @Delete('platforms/:id(\\d+)')
  @Private(PermissionTarget.Admin)
  async deletePlatform() {
    // TODO
    return;
  }
}
