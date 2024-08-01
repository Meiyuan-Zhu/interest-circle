import 'reflect-metadata';
import { createApp } from '@midwayjs/mock';
import { join } from 'path';
import { createConnection } from 'typeorm';

(async () => {
  
  await createConnection({
    type: 'sqlite',
    database: join(__dirname, '../../database.sqlite'),
    synchronize: true,
    logging: false,
    entities: [join(__dirname, './models/*.ts')],
  });

  
  const app = await createApp(join(__dirname, 'config'));
  app.listen(3000);
  console.log('Server running at http://localhost:3000');
})();
