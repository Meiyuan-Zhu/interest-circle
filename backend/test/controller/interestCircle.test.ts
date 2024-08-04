import { Framework } from "@midwayjs/koa";
import { createApp, createHttpRequest } from "@midwayjs/mock";


describe ('InterestCircleController', () => {
    let app;

    beforeAll(async () => {
        app = await createApp<Framework>();
    })

    afterAll(async () => {
        await app.close();
    })

    it('should POST /api/interest-circles/create', async () => {
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
    })
})