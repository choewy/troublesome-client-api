import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AppService } from './app.service';
import { Public } from './common';

@Public()
@ApiTags('앱')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getPackageProfile() {
    return this.appService.getPackageProfile();
  }
}
