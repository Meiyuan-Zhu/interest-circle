import { createApp } from '@midwayjs/mock';
import { Framework } from '@midwayjs/koa';
import { join } from 'path';

let app;

beforeAll(async () => {
  app = await createApp<Framework>(join(__dirname, '../../src/config'));
});

afterAll(async () => {
  await app.close();
});
