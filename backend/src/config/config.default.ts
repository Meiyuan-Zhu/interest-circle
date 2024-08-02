import { MidwayConfig } from '@midwayjs/core';
import { join } from 'path';
import * as dotenv from 'dotenv';
import { User } from '../entity/user';

dotenv.config({ path: join(__dirname,'../../.env')})

export default {
  keys: 'O0vyCN9yemfxobhZkBtPM/HfTM6y6Mxazs8vTzhbuE8=',
  koa: {
    port: 7001,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  mongoose: {
    dataSource: {
      default:{
        uri:'mongodb://localhost:27017/test',
        options: {
          userNewUrlParser: true,
          useUnifiedTopology: true,
        },
        entities: [User],
      }
    }
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
