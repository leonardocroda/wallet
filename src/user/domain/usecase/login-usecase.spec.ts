import { LoginUsecase } from './login-usecase';

// Mock para o serviço IJwtService
class MockJwtService {
  sign(payload: any) {
    return `fake_token_for_${payload.email}`;
  }
}

describe('LoginUsecase', () => {
  let loginUsecase: LoginUsecase;
  let mockJwtService: MockJwtService;

  beforeEach(() => {
    mockJwtService = new MockJwtService();
    loginUsecase = new LoginUsecase(mockJwtService);
  });

  it('should return an object with an access_token when executed', () => {
    const user = { id: 123, email: 'test@example.com' };

    const result = loginUsecase.execute(user);

    expect(result).toHaveProperty('access_token');

    expect(result.access_token).toEqual('fake_token_for_test@example.com');
  });
});
