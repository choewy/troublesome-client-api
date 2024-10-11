import { Injectable } from '@nestjs/common';

import { PermissionMetadataDTO } from './dtos';
import { PermissionMetadataMap } from './implements';

@Injectable()
export class PermissionService {
  async getMetadatas() {
    return new PermissionMetadataMap().values.map((metadata) => new PermissionMetadataDTO(metadata));
  }
}
