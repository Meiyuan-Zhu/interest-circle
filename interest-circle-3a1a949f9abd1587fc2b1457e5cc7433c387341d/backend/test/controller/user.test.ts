import { createApp, close, createHttpRequest } from '@midwayjs/mock';
import { Framework } from '@midwayjs/koa';
import { expect } from '@jest/globals';

describe('test/controller/user.controller.ts', () => {

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
      .send({ username: 'testuser', password: 'password123' });

    expect(result.status).toBe(200);
    expect(result.body.success).toBe(true);
    expect(result.body.message).toBe('User registered successfully');
  });

  it('should POST /api/users/login', async () => {
    await createHttpRequest(app)
      .post('/api/users/register')
      .send({ username: 'testuser', password: 'password123' });

    const result = await createHttpRequest(app)
      .post('/api/users/login')
      .send({ username: 'testuser', password: 'password123' });

    expect(result.status).toBe(200);
    expect(result.body.success).toBe(true);
    expect(result.body.token).toBeDefined();
  });

});
