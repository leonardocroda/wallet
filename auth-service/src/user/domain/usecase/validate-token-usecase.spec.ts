import { ValidateTokenUsecase } from './validate-token-usecase';
import { VerifyJwtService } from '../gateways/verify-jwt-service';

describe('ValidateTokenUsecase', () => {
  let validateTokenUsecase: ValidateTokenUsecase;
  let verifyJwtService: VerifyJwtService;
  const decoded = { id: 123, email: 'example@example.com', accountId: 1 };
  beforeEach(() => {
    verifyJwtService = {
      verify: (_token) => decoded,
    };
    validateTokenUsecase = new ValidateTokenUsecase(verifyJwtService);
  });

  describe('execute', () => {
    it('should return decoded token for valid token', async () => {
      const token = 'valid_jwt_token';

      const result = await validateTokenUsecase.execute(token);

      expect(result).toEqual(decoded);
    });

    it('should return accountId 0 if token not decoded', async () => {
      const token = 'invalid_jwt_token';

      jest.spyOn(verifyJwtService, 'verify').mockImplementation(() => {
        return { accountId: 0, email: '', id: 0 };
      });

      const result = await validateTokenUsecase.execute(token);

      expect(result.accountId).toEqual(0);
    });
  });
});
