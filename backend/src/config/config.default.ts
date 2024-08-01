import { MidwayConfig } from '@midwayjs/core';
import { join } from 'path'

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1722517303550_5633',
  koa: {
    port: 7001,
  },
  typerom: {
    type: 'sqlite',
    database: join(__dirname, '../../database.sqlite'),
    synchronize: true,
    logging: false,
    entities: [join(__dirname, '../models/*.ts')],
  },
} as MidwayConfig;
