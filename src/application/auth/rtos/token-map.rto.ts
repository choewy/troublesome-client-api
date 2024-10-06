import { ApiProperty } from '@nestjs/swagger';

import { TokenMap } from '@/domain/token/interfaces/token-map.interface';

export class TokenMapRTO {
  @ApiProperty({ type: String, description: 'ACCESS TOKEN' })
  accessToken: string;

  @ApiProperty({ type: String, description: 'REFRESH TOKEN' })
  refreshToken: string;

  constructor(tokenMap: TokenMap) {
    this.accessToken = tokenMap.accessToken;
    this.refreshToken = tokenMap.refreshToken;
  }
}
