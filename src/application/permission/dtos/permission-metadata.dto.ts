import { ApiProperty } from '@nestjs/swagger';

import { PermissionMetadata } from '../implements/permission-metadata';

import { PermissionTarget } from '@/domain/permission/enums';

export class PermissionMetadataDTO {
  @ApiProperty({ type: String, enum: PermissionTarget, description: '대상' })
  target: string;

  @ApiProperty({ type: String, description: '값' })
  value: string;

  @ApiProperty({ type: [PermissionMetadataDTO], description: '하위항목' })
  children: PermissionMetadataDTO[];

  constructor(metadata: PermissionMetadata) {
    this.target = metadata.target;
    this.value = metadata.value;
    this.children = metadata.children.map((child) => new PermissionMetadataDTO(child));
  }
}
