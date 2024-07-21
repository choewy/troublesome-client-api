import { VersionDTOArgs } from '@common';
import { AppConfigService } from '@core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private readonly appConfigService: AppConfigService) {}

  getVersion() {
    return [this.appConfigService.name, this.appConfigService.env, this.appConfigService.version] as VersionDTOArgs;
  }
}
