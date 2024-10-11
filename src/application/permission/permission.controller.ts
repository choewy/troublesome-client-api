import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { PermissionMetadataDTO } from './dtos';
import { PermissionService } from './permission.service';

import { Private } from '@/common';

@Private()
@ApiTags('권한')
@Controller('permissions')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Get()
  @ApiOperation({ summary: '권한 메타데이터 조회' })
  @ApiOkResponse({ type: [PermissionMetadataDTO] })
  async getMetadatas() {
    return this.permissionService.getMetadatas();
  }
}
