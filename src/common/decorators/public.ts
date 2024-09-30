import { ExecutionContext, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { SetMetadataKey } from '../constants';

export const Public = () => SetMetadata(SetMetadataKey.AccessModifier, true);

export const isPublic = (reflector: Reflector, context: ExecutionContext) =>
  reflector.getAllAndOverride(SetMetadataKey.AccessModifier, [context.getClass(), context.getHandler()]) === true;
