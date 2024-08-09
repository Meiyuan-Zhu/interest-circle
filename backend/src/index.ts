import { createApp } from '@midwayjs/mock';
import { Framework } from '@midwayjs/koa';

async function bootstrap() {
  const app = await createApp<Framework>();
  const port = process.env.PORT || 7001;

  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
}

bootstrap().catch((err) => {
  console.error('Server failed to start', err);
  process.exit(1);
});
