import { NodeEnv } from '@core';
import { ApiResponseProperty } from '@nestjs/swagger';

export class VersionDTO {
  @ApiResponseProperty({ type: String })
  name: string;

  @ApiResponseProperty({ type: String, enum: NodeEnv })
  env: NodeEnv;

  @ApiResponseProperty({ type: String })
  version: string;

  constructor(name: string, env: NodeEnv, version: string) {
    this.name = name;
    this.env = env;
    this.version = version;
  }
}
