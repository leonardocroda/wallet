import { Account } from '../../../account/domain/entity/account';
import { GetUserByEmailRepository } from '../gateways/get-user-by-email-repository';
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
            account: { id: 1 } as Account,
          });
        }
      }),
    };
    loginUsecase = new LoginUsecase(mockJwtService, mockRepository);
  });

  it('should return an object with an access_token when executed', async () => {
    const user = { id: 123, email: 'example@example.com' };

    const result = await loginUsecase.execute(user);

    expect(result).toHaveProperty('access_token');

    expect(result.access_token).toEqual('fake_token_for_example@example.com');
  });
});
