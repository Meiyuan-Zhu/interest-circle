import { MidwayConfig } from '@midwayjs/core';
import { join } from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: join(__dirname,'../../.env')})

export default {
  keys: 'O0vyCN9yemfxobhZkBtPM/HfTM6y6Mxazs8vTzhbuE8=',
  koa: {
    port: 7001,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  typeorm: {
    type: "sqlite",
    database: join(__dirname, '../../database/sqlite'),
    synchronize: true,
    logging:false,
    entities: [join(__dirname, '../models/*.ts')],

  }
} as MidwayConfig;
