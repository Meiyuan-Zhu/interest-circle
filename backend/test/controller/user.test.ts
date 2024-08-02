import { createApp, close, createHttpRequest } from '@midwayjs/mock';
import { Framework } from '@midwayjs/koa';

describe('test/controller/user.test.ts', () => {
  let app;

  beforeAll(async () => {
    // 创建应用程序
    app = await createApp<Framework>();
  });

  afterAll(async () => {
    // 关闭应用程序
    await close(app);
  });

  it('should POST /api/users/register', async () => {
    const result = await createHttpRequest(app)
      .post('/api/users/register')
      .send({ username: 'testuser', password: 'testpassword' });

    expect(result.status).toBe(201);
    expect(result.body.message).toBe('注册成功');
  });

  it('should POST /api/users/login', async () => {
    // 先注册用户
    await createHttpRequest(app)
      .post('/api/users/register')
      .send({ username: 'testuser', password: 'testpassword' });

    // 登录用户
    const result = await createHttpRequest(app)
      .post('/api/users/login')
      .send({ username: 'testuser', password: 'testpassword' });

    expect(result.status).toBe(200);
    expect(result.body).toHaveProperty('token');
  });

  it('should POST /api/users/get_user', async () => {
    // 先注册用户
    await createHttpRequest(app)
      .post('/api/users/register')
      .send({ username: 'testuser', password: 'testpassword' });

    // 登录获取 token
    const loginResult = await createHttpRequest(app)
      .post('/api/users/login')
      .send({ username: 'testuser', password: 'testpassword' });

    const token = loginResult.body.token;

    // 获取用户信息
    const result = await createHttpRequest(app)
      .get('/api/users/get_user')
      .set('Authorization', `Bearer ${token}`)
      .query({ uid: 123 });

    expect(result.status).toBe(200);
    expect(result.body.message).toBe('OK');
    expect(result.body.data).toHaveProperty('username', 'mockedName');
  });
});
