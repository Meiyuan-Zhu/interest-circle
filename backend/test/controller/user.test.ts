import { createApp, close, createHttpRequest } from '@midwayjs/mock';
import { Framework } from '@midwayjs/koa';
import * as assert from 'assert';
import { after } from 'node:test';

describe('UserController', ()=> {

    it('should POST /api/users/register', async () => {
        const app = await createApp<Framework>();

        const result = await createHttpRequest(app).post('/api/users/register').send({
            username: 'test',
            password: '123456',
        });
        assert(result.status === 201);
        assert(result.body.id);
    
    })

    it('should POST /api/users/login',async () => {
        const app = await createApp<Framework>();

        await createHttpRequest(app)
            .post('/api/users/register')
            .send({username: 'test', password: '123456'});

        const restult = await createHttpRequest(app)
            .post('/api/users/login')
            .send({username: 'test', password: '123456'});

        assert(restult.status === 200);
        assert(restult.body.token);
    });
});
