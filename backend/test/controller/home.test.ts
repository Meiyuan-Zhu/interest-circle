import { createApp, close, createHttpRequest } from '@midwayjs/mock';
import { Framework } from '@midwayjs/koa';
import { join } from 'path';

describe('Home Tests', () => {
  let app;
  beforeAll(async () => {
    app = await createApp<Framework>(join(__dirname, '../../src/config'));
  });

  afterAll(async () => {
    await close(app);
  });

  it('should GET /', async () => {
    const result = await createHttpRequest(app).get('/');
    expect(result.status).toBe(200);
  });
});
