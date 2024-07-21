import { RequestHeader } from '@common';
import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiSecurity } from '@nestjs/swagger';

export const ApiAuthHeaders = () => applyDecorators(ApiBearerAuth(RequestHeader.AccessToken), ApiSecurity(RequestHeader.RefreshToken));
