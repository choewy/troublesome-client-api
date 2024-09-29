import { ApiProperty } from '@nestjs/swagger';

export class TokensDTO {
  @ApiProperty({ type: String, description: 'ACCESS TOKEN' })
  accessToken: string;

  @ApiProperty({ type: String, description: 'REFRESH TOKEN' })
  refreshToken: string;

  constructor(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }
}
