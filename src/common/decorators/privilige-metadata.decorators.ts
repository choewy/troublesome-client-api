import { UserPrivilige } from '@choewy/troublesome-entity';
import { ExecutionContext, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { SetMetadataKey } from '../constants';

// TODO 나중에 역할과 권한으로 관리할 것
export const SystemAdmin = () => SetMetadata(SetMetadataKey.Privilige, UserPrivilige.SystemAdmin);
export const Partner = () => SetMetadata(SetMetadataKey.Privilige, UserPrivilige.User);
export const Fulfillment = () => SetMetadata(SetMetadataKey.Privilige, UserPrivilige.User);
export const getPrivilige = (reflector: Reflector, context: ExecutionContext) =>
  reflector.getAllAndOverride(SetMetadataKey.Privilige, [context.getClass(), context.getHandler()]) ?? null;
