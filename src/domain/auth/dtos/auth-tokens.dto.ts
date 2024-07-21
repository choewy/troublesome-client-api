import { ApiResponseProperty } from '@nestjs/swagger';

export type AuthTokenDTOArgs = [string, string];

export class AuthTokensDTO {
  @ApiResponseProperty({ type: String })
  accessToken: string;

  @ApiResponseProperty({ type: String })
  refreshToken: string;

  constructor([accessToken, refreshToken]: AuthTokenDTOArgs) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }
}
