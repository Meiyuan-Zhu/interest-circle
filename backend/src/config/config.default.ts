import { join } from 'path';
import * as dotenv from 'dotenv';
import { MidwayConfig } from '@midwayjs/core';

dotenv.config();

export default {
  baseDir: join(__dirname, '../../'),
  keys: '1234567',
  koa: {
    port: 7001,
  },
  typeorm: {
    type: 'sqlite',
    database: join(__dirname, '../../database.sqlite'),
    synchronize: true,
    logging: false,
    entities: [join(__dirname, '../models/*.ts')],
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
} as MidwayConfig;
