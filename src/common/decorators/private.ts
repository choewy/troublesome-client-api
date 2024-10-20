import { applyDecorators, ExecutionContext, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ApiBearerAuth, ApiResponse, ApiSecurity } from '@nestjs/swagger';

import { RequestHeader, ResponseHeader, SetMetadataKey } from '../enums';

import { PermissionTarget } from '@/libs';

export const Private = (...targets: PermissionTarget[]) =>
  applyDecorators(
    SetMetadata(SetMetadataKey.AccessModifier, false),
    SetMetadata(SetMetadataKey.PermissionTargets, targets ?? []),
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

export const isPrivate = (reflector: Reflector, context: ExecutionContext): boolean =>
  reflector.getAllAndOverride(SetMetadataKey.AccessModifier, [context.getClass(), context.getHandler()]) === false;

export const getPermissionTargets = (reflector: Reflector, context: ExecutionContext): PermissionTarget[] =>
  reflector.getAllAndOverride(SetMetadataKey.PermissionTargets, [context.getClass(), context.getHandler()]) ?? [];
