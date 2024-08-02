import { MidwayConfig } from '@midwayjs/core';
import { join } from 'path';

export default {
  koa: {
    port: null,
  },
  typeorm: {
    type: 'sqlite',
    database: join(__dirname, '../../database/database.sqlite'),
    synchronize: true,
    logging: false,
    entities: [join(__dirname, '../models/*.ts')],
  },
} as MidwayConfig;
