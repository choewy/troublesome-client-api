import { ExecutionContext, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export const SKIP_BIND_USER = '__SKIP_BIND_USER__';

export const SkipBindUser = () => SetMetadata(SKIP_BIND_USER, true);

export const isSkipBindUser = (reflector: Reflector, context: ExecutionContext) => {
  return reflector.getAllAndOverride(SKIP_BIND_USER, [context.getClass(), context.getHandler()]) === true;
};
