import { createApp, close, createHttpRequest } from '@midwayjs/mock';
import { Framework } from '@midwayjs/koa';

describe('UserController', () => {
  let app;

  beforeAll(async () => {
    app = await createApp<Framework>();
  });

  afterAll(async () => {
    await close(app);
  });

  it('should POST /api/users/register', async () => {
    const result = await createHttpRequest(app)
      .post('/api/users/register')
      .send({ username: 'testuser', password: 'testpassword' });

    expect(result.status).toBe(200);
    expect(result.body.message).toBe('注册成功');
  });

  it('should POST /api/users/login', async () => {
    const result = await createHttpRequest(app)
      .post('/api/users/login')
      .send({ username: 'testuser', password: 'testpassword' });

    expect(result.status).toBe(200);
    expect(result.body).toHaveProperty('user');
  });

});
