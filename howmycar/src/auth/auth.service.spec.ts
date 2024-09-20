import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { randomBytes } from 'crypto';

describe(AuthService.name, () => {
  let authService: AuthService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    const users: User[] = [];
    fakeUsersService = {
      create: (newUser: CreateUserDto) => {
        const user = {
          id: parseInt(randomBytes(2).toString('hex'), 16),
          email: newUser.email,
          password: newUser.password,
        };
        users.push(user as User);
        return Promise.resolve(user as User);
      },
      find: (email: string) =>
        Promise.resolve(users.filter((user) => user.email.includes(email))),
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    authService = module.get(AuthService);
  });

  it('should exist', async () => {
    expect(authService).toBeDefined();
  });

  describe('signup', () => {
    it('should create a valid new user with salted & hashed password', async () => {
      const email = 'test@test.com',
        password = 'monkeydonkey';
      const user = await authService.signup({ email, password });

      expect(user).toBeDefined();
      expect(user.email).toEqual(email);
      expect(user.password).not.toEqual(password);

      const [salt, hash] = user.password.split('.');
      expect(salt).toBeDefined();
      expect(hash).toBeDefined();
    });

    it(`should throw ${ConflictException.name} if user provides an email which is already in use`, async () => {
      const email = 'test@test.com';
      await authService.signup({ email, password: 'whatever' });

      await expect(() =>
        authService.signup({ email, password: 'another' }),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('signin', () => {
    it(`should throw ${UnauthorizedException.name} if user provides a non-registered email`, async () => {
      await expect(() =>
        authService.signin({
          email: 'whatever@test.com',
          password: 'whatever',
        }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it(`should throw ${UnauthorizedException.name} if user provides an invalid password`, async () => {
      const email = 'test@test.com',
        password1 = 'monkey',
        password2 = 'donkey';
      await authService.signup({
        email,
        password: password1,
      });

      await expect(() =>
        authService.signin({ email, password: password2 }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should return a user if correct email & password are provided', async () => {
      const email = 'test@test.com',
        password = 'monkeydonkey';
      await authService.signup({ email, password });

      const user = await authService.signin({ email, password });
      expect(user).toBeDefined();
    });
  });
});
