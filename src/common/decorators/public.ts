import { applyDecorators, ExecutionContext, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { SetMetadataKey } from '../enums';

export const Public = () => applyDecorators(SetMetadata(SetMetadataKey.AccessModifier, true));

export const isPublic = (reflector: Reflector, context: ExecutionContext) =>
  reflector.getAllAndOverride(SetMetadataKey.AccessModifier, [context.getClass(), context.getHandler()]) === true;
