import { AppConfigService } from '@core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private readonly appConfigService: AppConfigService) {}

  getVersion() {
    return this.appConfigService.version;
  }
}
