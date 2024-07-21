import { VersionDTO } from '@common';
import { AppConfigService } from '@core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private readonly appConfigService: AppConfigService) {}

  getVersion() {
    return new VersionDTO(this.appConfigService.name, this.appConfigService.env, this.appConfigService.version);
  }
}
