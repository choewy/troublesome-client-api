export type JwtVerifyResult = {
  id: number | null;
  error: unknown;
  expired: boolean;
};
