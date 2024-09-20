import { UnauthorizedException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SignDto } from './dtos/sign.dto';
import { User } from 'src/users/user.entity';

describe(AuthController.name, () => {
  let authController: AuthController;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeAuthService = {
      signup: ({ email, password }: SignDto) =>
        Promise.resolve({ id: 1, email, password } as User),
      signin: ({ email, password }: SignDto) =>
        Promise.resolve({ id: 1, email, password } as User),
    };

    const module = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: fakeAuthService,
        },
      ],
    }).compile();

    authController = module.get(AuthController);
  });

  it('should exist', async () => {
    expect(authController).toBeDefined();
  });

  describe('checkStatus', () => {
    it(`should throw ${UnauthorizedException.name} if user is null`, () => {});
    it(`should return user if user is not null`, () => {});
  });

  describe('signout', () => {
    it('should set session.userId to null', () => {
      const session: any = {};
      authController.signout(session);
      expect(session.userId).toBeFalsy();
    });
  });

  const fakeSignDto: SignDto = { email: 'test@test.com', password: 'donkey' };

  describe('signup', () => {
    it('should set session.userId and return a user', async () => {
      const session: any = {};
      const user = await authController.signup(fakeSignDto, session);
      expect(user).toBeDefined();
      expect(session.userId).toBeTruthy();
    });
  });

  describe('signin', () => {
    it('should set session.userId and return a user', async () => {
      const session: any = {};
      const user = await authController.signin(fakeSignDto, session);
      expect(user).toBeDefined();
      expect(session.userId).toBeTruthy();
    });
  });
});
