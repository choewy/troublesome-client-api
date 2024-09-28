import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { VersionDTO } from './dtos';
import { VersionService } from './version.service';

@ApiTags('버전')
@Controller()
export class VersionController {
  constructor(private readonly versionService: VersionService) {}
  @Get()
  @ApiOperation({ summary: '버전 확인' })
  @ApiOkResponse({ type: VersionDTO })
  getVersion() {
    return this.versionService.getVersion();
  }
}
