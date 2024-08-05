import { MidwayConfig } from '@midwayjs/core';
import { join } from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: join(__dirname,'../../.env')})

export default {
  keys: '0b8ed91cc8ebe6269222c41ec101cd6ab1109228f32b71901ca7256684ba2288',
  koa: {
    port: 7001,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  mongoose: {
    url: 'mongodb://localhost:27017/interest-circle',
  },
  
} as MidwayConfig;
