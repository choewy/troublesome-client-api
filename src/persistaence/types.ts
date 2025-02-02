import { OAuthPlatform } from './enums';

export type AuthApiResponseType = {
  id: string;
  platform: OAuthPlatform;
  nickname: string;
  imageUrl: string;
  gameId: string | null;
  playerId: string | null;
};

export type KakaoApiLoginPageURIRequestParam = {
  redirectUri: string;
};

export type KakaoApiLoginPageURIResponseType = {
  uri: string;
};

export type KakaoApiLoginRequestBody = {
  redirectUri: string;
  code: string;
};

export type KakaoApiLoginResponseType = {
  accessToken: string;
  refreshToken: string;
};
