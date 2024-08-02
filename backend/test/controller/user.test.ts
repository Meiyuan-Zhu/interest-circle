import { createApp, close, createHttpRequest } from '@midwayjs/mock';
import { Framework } from '@midwayjs/koa';
import * as assert from 'assert';
import { afterAll, beforeAll, describe, it } from '@jest/globals';


describe('UserController', ()=> {
    let app;

    beforeAll(async () => {
        // create app
        app = await createApp<Framework>('../../src');
    });

    afterAll(async () => {
        // close app
        await close(app);
    });

    it('should POST /api/users/register', async () => {
        const result = await createHttpRequest(app).post('/api/users/register').send({
            username: 'test',
            password: '123456',
        });
        assert(result.status === 201);
        assert(result.body.id);
    
    })

    it('should POST /api/users/login',async () => {
        await createHttpRequest(app)
            .post('/api/users/register')
            .send({username: 'test', password: '123456'});

        const restult = await createHttpRequest(app)
            .post('/api/users/login')
            .send({username: 'test', password: '123456'});

        assert(restult.status === 200);
        assert(restult.body.token);
    });

    it('should POST /api/users/get_user', async () => {
        const result = await createHttpRequest(app)
          .post('/api/users/get_user')
          .send({ uid: 1 });
    
        expect(result.status).toBe(200);
        expect(result.body.username).toBeDefined();
      });
});
