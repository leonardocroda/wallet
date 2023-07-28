import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './users.entity';

describe('UsersService', () => {
  let usersService: UsersService;

  const mockRepository = {
    findOne: jest.fn(({ where: { email } }) => {
      if (email === 'example@example.com') {
        return Promise.resolve({ email, id: 1 });
      }
    }),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
      ],
    }).compile();

    usersService = moduleRef.get<UsersService>(UsersService);
  });

  describe('getByEmail', () => {
    it('should return a user when the user is found', async () => {
      const email = 'example@example.com';
      const user = await usersService.getByEmail(email);
      expect(user).toBeDefined();
      expect(user.email).toBe(email);
    });

    it('should return undefined when the user is not found', async () => {
      const email = 'nonexistent@example.com';
      const user = await usersService.getByEmail(email);
      expect(user).toBeUndefined();
    });
  });
});
