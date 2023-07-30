import { ValidateUserUsecase } from './validate-user-usecase';

class MockGetUserByEmailRepository {
  private users: any[];

  constructor(users: any[]) {
    this.users = users;
  }

  async getUserByEmail(email: string) {
    return this.users.find((user) => user.email === email) || null;
  }
}

describe('ValidateUserUsecase', () => {
  const users = [
    { id: 1, email: 'user1@example.com', password: 'pass123' },
    { id: 2, email: 'user2@example.com', password: 'pass456' },
  ];

  let validateUserUsecase: ValidateUserUsecase;
  let mockGetUserByEmailRepository: MockGetUserByEmailRepository;

  beforeEach(() => {
    mockGetUserByEmailRepository = new MockGetUserByEmailRepository(users);
    validateUserUsecase = new ValidateUserUsecase(mockGetUserByEmailRepository);
  });

  it('should return null for non-existent user', async () => {
    const email = 'nonexistent@example.com';
    const password = 'randomPassword';

    const result = await validateUserUsecase.execute(email, password);

    expect(result).toBeNull();
  });

  it('should return null for incorrect password', async () => {
    const email = 'user1@example.com';
    const password = 'incorrectPassword';

    const result = await validateUserUsecase.execute(email, password);

    expect(result).toBeNull();
  });

  it('should return user data (without password) for valid credentials', async () => {
    const email = 'user2@example.com';
    const password = 'pass456';

    const result = await validateUserUsecase.execute(email, password);

    expect(result).toEqual({ id: 2, email: 'user2@example.com' });
  });
});
