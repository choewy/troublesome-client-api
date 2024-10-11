import { PermissionMetadata } from './permission-metadata';

import { PermissionTarget } from '@/domain/permission/enums';

export class PermissionMetadataMap {
  private readonly metadatas: PermissionMetadata[] = [];

  constructor() {
    const targets = Object.values(PermissionTarget);

    for (const target of targets) {
      const values = target.split('.');
      const value = values.shift();

      let metadata = this.metadatas.find((metadata) => metadata.value === value) ?? null;

      if (metadata === null) {
        const key = value as PermissionTarget;
        metadata = new PermissionMetadata(key, value);

        this.metadatas.push(metadata);
      }

      this.addChild(values, metadata);
    }
  }

  private addChild(values: string[], parent: PermissionMetadata) {
    if (values.length === 0) {
      return;
    }

    const value = values.shift();

    let metadata = parent.children.find((child) => child.value === value) ?? null;

    if (metadata === null) {
      const key = (parent.target ? `${parent.target}.${value}` : value) as PermissionTarget;
      metadata = new PermissionMetadata(key, value);

      parent.children.push(metadata);
    }

    this.addChild(values, metadata);
  }

  public get values() {
    return this.metadatas;
  }

  public find(target: string, metadatas: PermissionMetadata[] = this.metadatas) {
    for (const metadata of metadatas) {
      if (metadata.target === target) {
        return metadata;
      }

      const child = this.find(target, metadata.children);

      if (child) {
        return child;
      }
    }

    return null;
  }
}
