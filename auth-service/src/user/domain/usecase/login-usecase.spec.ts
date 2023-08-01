import { GetUserByEmailRepository } from '../gateways/get-user-by-email-repository';
import { LoginUsecase } from './login-usecase';

class MockJwtService {
  sign(payload: any) {
    return `fake_token_for_${payload.email}`;
  }
}

describe('LoginUsecase', () => {
  let loginUsecase: LoginUsecase;
  let mockJwtService: MockJwtService;

  let mockRepository: GetUserByEmailRepository;

  beforeEach(() => {
    mockJwtService = new MockJwtService();
    mockRepository = {
      getUserByEmail: jest.fn((email) => {
        if (email === 'example@example.com') {
          return Promise.resolve({
            email,
            id: 123,
            name: 'teste',
            accountId: 1,
            password: '123',
          });
        }
      }),
    };
    loginUsecase = new LoginUsecase(mockJwtService, mockRepository);
  });

  it('should return an object with an access_token when executed', async () => {
    const user = { email: 'example@example.com', password: '123' };

    const result = await loginUsecase.execute(user);

    expect(result).toHaveProperty('access_token');

    expect(result.access_token).toEqual('fake_token_for_example@example.com');
  });

  it('should return an invalid access_token when user does not exist', async () => {
    const user = { email: 'notfound@example.com', password: '123' };

    const result = await loginUsecase.execute(user);

    expect(result).toHaveProperty('access_token');

    expect(result.access_token).toEqual('invalid');
  });

  it('should return an invalid access_token when password does not match', async () => {
    const user = { email: 'example@example.com', password: 'notmatch' };

    const result = await loginUsecase.execute(user);

    expect(result).toHaveProperty('access_token');

    expect(result.access_token).toEqual('invalid');
  });
});
