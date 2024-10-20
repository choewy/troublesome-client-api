import { Injectable } from '@nestjs/common';

import { AppConfigFactory } from '@/common';

@Injectable()
export class AppService {
  constructor(private readonly appConfigFactory: AppConfigFactory) {}

  public getPackageProfile() {
    return this.appConfigFactory.packageProfile;
  }
}
