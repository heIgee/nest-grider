import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from 'src/app.module';
import { get } from 'http';
import { send } from 'process';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/auth/whoami (GET) [unauthorized]', () => {
    return request(app.getHttpServer()).get('/auth/whoami').expect(401);
  });

  const regEmail = 'test@test.com',
    regPwd = 'monkey';

  it('/auth/signup (POST) + /auth/whoami (GET) [authorized]', async () => {
    const signupRes = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email: regEmail, password: regPwd })
      .expect(201);

    const { id, email } = signupRes.body;
    expect(id).toBeDefined();
    expect(email).toEqual(regEmail);

    const cookie = signupRes.headers['set-cookie'];

    const whoamiRes = await request(app.getHttpServer())
      .get('/auth/whoami')
      .set('cookie', cookie)
      .expect(200);

    expect(whoamiRes.body.email).toEqual(regEmail);
  });

  it('/auth/signin (POST) + /auth/whoami (GET) [authorized]', async () => {
    const signinRes = await request(app.getHttpServer())
      .post('/auth/signin')
      .send({ email: regEmail, password: regPwd })
      .expect(200);

    const { id, email } = signinRes.body;
    expect(id).toBeDefined();
    expect(email).toEqual(regEmail);

    const cookie = signinRes.headers['set-cookie'];

    const whoamiRes = await request(app.getHttpServer())
      .get('/auth/whoami')
      .set('cookie', cookie)
      .expect(200);

    expect(whoamiRes.body.email).toEqual(regEmail);
  });
});
