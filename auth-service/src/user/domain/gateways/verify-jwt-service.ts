export interface VerifyJwtService {
  verify(token: string): { accountId: number; email: string; id: number };
}
