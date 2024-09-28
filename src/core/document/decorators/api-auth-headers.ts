import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiSecurity } from '@nestjs/swagger';

import { RequestHeader } from '@/common';

export const ApiAuthHeaders = () => applyDecorators(ApiBearerAuth(RequestHeader.AccessToken), ApiSecurity(RequestHeader.RefreshToken));
