import { createApp, close, createHttpRequest } from '@midwayjs/mock';
import { Framework } from '@midwayjs/koa';
import { join } from 'path';

describe('API Tests', () => {
  let app;
  beforeAll(async () => {
    app = await createApp<Framework>(join(__dirname, '../../src/config'));
  });

  afterAll(async () => {
    await close(app);
  });

  it('should POST /api/users/register', async () => {
    const result = await createHttpRequest(app).post('/api/users/register').send({
      username: 'testuser',
      password: 'testpassword',
    });
    expect(result.status).toBe(200);
    expect(result.body.message).toBe('User registered successfully');
  });

  it('should POST /api/users/login', async () => {
    const result = await createHttpRequest(app).post('/api/users/login').send({
      username: 'testuser',
      password: 'testpassword',
    });
    expect(result.status).toBe(200);
    expect(result.body.message).toBe('Login successful');
  });
});

