import { Framework } from "@midwayjs/koa";
import { createApp, close, createHttpRequest } from "@midwayjs/mock";


describe ('test/controller/interestCircle.test.ts', () => {

    it('should POST /api/interest-circles/create', async () => {

        const app = await createApp<Framework>();


        const result = await createHttpRequest(app)
            .post('/api/interest-circles/create')
            .send({
                name: 'testCircle',
                description: 'testDescription',
                createdBy: 'testuser'
            })
            
        expect(result.status).toEqual(200);
        expect(result.body.message).toBe('兴趣圈创建成功');
        expect(result.body.data).toHaveProperty('id');

        await close(app);
    })
})