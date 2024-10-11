import { PermissionTarget } from '@/domain/permission/enums';

export class PermissionMetadata {
  constructor(
    public readonly target: PermissionTarget,
    public readonly value: string,
    public readonly children: PermissionMetadata[] = [],
  ) {}
}
