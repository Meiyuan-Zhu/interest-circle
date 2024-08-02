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
    type: 'sqlite',
    database: join(__dirname, '../../database/database.sqlite'),
    synchronize: true,
    logging: false,
    entities: [join(__dirname, '../models/*.ts')],
  },
  midwayLogger: {
    default: {
      enableFile: true,
      fileLogName: 'midway-core.log',
      format: info => {
        return `${info.timestamp} ${info.level} ${info.message}`;
      },
      options: {
        maxSize: '10m',
        maxFiles: '10d',
        disableSymlink: true, // 禁用符号链接
      },
    },
    clients: {
      commonErrorLogger: {
        enableFile: true,
        fileLogName: 'common-error.log',
        format: info => {
          return `${info.timestamp} ${info.level} ${info.message}`;
        },
        options: {
          maxSize: '10m',
          maxFiles: '10d',
          disableSymlink: true, // 禁用符号链接
        },
      },
    },
  },
} as MidwayConfig;
