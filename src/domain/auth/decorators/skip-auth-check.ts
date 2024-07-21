import { ExecutionContext, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export const SKIP_AUTH_CHECK = '__SKIP_AUTH_CHECK__';

export const SkipAuthCheck = () => SetMetadata(SKIP_AUTH_CHECK, true);

export const isSkipAuthCheck = (reflector: Reflector, context: ExecutionContext) => {
  return reflector.getAllAndOverride(SKIP_AUTH_CHECK, [context.getClass(), context.getHandler()]) === true;
};
