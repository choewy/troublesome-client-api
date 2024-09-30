import { applyDecorators, ExecutionContext, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ApiBearerAuth, ApiResponse, ApiSecurity } from '@nestjs/swagger';

import { RequestHeader, ResponseHeader, SetMetadataKey } from '../constants';

export const Public = () => SetMetadata(SetMetadataKey.AccessModifier, true);

export const isPublic = (reflector: Reflector, context: ExecutionContext) =>
  reflector.getAllAndOverride(SetMetadataKey.AccessModifier, [context.getClass(), context.getHandler()]) === true;

export const Private = () =>
  applyDecorators(
    SetMetadata(SetMetadataKey.AccessModifier, false),
    ApiBearerAuth(RequestHeader.AccessToken),
    ApiSecurity(RequestHeader.RefreshToken),
    ApiResponse({
      headers: {
        [ResponseHeader.RequestID]: { description: '요청 ID', schema: { type: 'string' } },
        [ResponseHeader.AccessToken]: { description: '갱신된 AccessToken', schema: { type: 'string' } },
        [ResponseHeader.RefreshToken]: { description: '갱신된 RefreshToken', schema: { type: 'string' } },
      },
    }),
  );

export const isPrivate = (reflector: Reflector, context: ExecutionContext) =>
  reflector.getAllAndOverride(SetMetadataKey.AccessModifier, [context.getClass(), context.getHandler()]) === false;
