import { IMidwayContainer } from '@midwayjs/core';
import { join } from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: join(__dirname,'../../.env')})

export default (appInfo: IMidwayContainer) => {
  return {
    keys: 'O0vyCN9yemfxobhZkBtPM/HfTM6y6Mxazs8vTzhbuE8=',
    koa: {
      port: 7001,
    },
    jwt: {
      secret: process.env.JWT_SECRET,
      expiresIn: '1h'
    },
    typeorm: {
      dataSource: {
        default: {
          type: 'mysql',
          host: '127.0.0.1',
          port: 3306,
          username: 'root',
          password: 'ZHzh007008009',
          database: 'Interest-circle',
          synchronize: true, 
          logging: false,
          entities: [join(__dirname, 'src/entity/*.ts')],
          extra: {
            authPlugins: {
              mysql_native_password: 'mysql_native_password'
            }
          }
        }
      }
    },
  };
};


