export interface TokenVerifyResult {
  id: number | null;
  error: unknown;
  expired: boolean;
}
