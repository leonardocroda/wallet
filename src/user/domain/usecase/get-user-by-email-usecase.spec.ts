import { GetUserByEmailUsecase } from './get-user-by-email-usecase';
import { GetUserByEmailRepository } from '../gateways/get-user-by-email-repository';

describe('Get User By Email Usecase', () => {
  let getUserByEmailUsecase: GetUserByEmailUsecase;

  const mockRepository: GetUserByEmailRepository = {
    getUserByEmail: jest.fn((email) => {
      if (email === 'example@example.com') {
        return Promise.resolve({ email, id: 1, name: 'Example' });
      }
    }),
  };

  beforeEach(async () => {
    getUserByEmailUsecase = new GetUserByEmailUsecase(mockRepository);
  });

  it('should return a user when the user is found', async () => {
    const email = 'example@example.com';
    const user = await getUserByEmailUsecase.getByEmail(email);
    expect(user).toBeDefined();
    expect(user.email).toBe(email);
  });

  it('should return undefined when the user is not found', async () => {
    const email = 'nonexistent@example.com';
    const user = await getUserByEmailUsecase.getByEmail(email);
    expect(user).toBeUndefined();
  });
});
