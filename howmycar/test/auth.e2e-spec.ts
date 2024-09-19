import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppModule } from 'src/app.module';
import { User } from 'src/users/user.entity';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [User],
          synchronize: true,
        }),
        AppModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/auth/whoami (GET)', () => {
    return request(app.getHttpServer()).get('/auth/whoami').expect(401);
  });

  it('/auth/signup (POST)', async () => {
    const regEmail = 'test@test.com';
    const res = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email: regEmail, password: 'whatever' })
      .expect(201);

    const { id, email } = res.body;
    expect(id).toBeDefined();
    expect(email).toEqual(regEmail);
  });
});
