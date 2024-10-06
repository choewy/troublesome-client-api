import { Injectable } from '@nestjs/common';

import { VersionDTO } from './dtos';

import { AppConfigService } from '@/global';

@Injectable()
export class VersionService {
  constructor(private readonly appConfigService: AppConfigService) {}

  getVersion() {
    return new VersionDTO(this.appConfigService.name, this.appConfigService.env, this.appConfigService.version);
  }
}
