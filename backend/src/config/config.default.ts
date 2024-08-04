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
    dataSource: {
      default: {
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'ZHzh007008009',
        database: 'interestCircle',
        
        synchronize: true,
        logging: false,

        entities: [join(__dirname,'../entities/*.ts')],

      }
    }
  }
} as MidwayConfig;
