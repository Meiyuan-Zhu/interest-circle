import { Configuration, App } from "@midwayjs/core";
import * as koa from "@midwayjs/koa";
import * as mongoose from 'mongoose'
import { join } from 'path';
import * as upload from '@midwayjs/upload';
import * as cors from '@koa/cors';


@Configuration({
  imports: [
    koa,
    upload,
  ],
  importConfigs: [
    join(__dirname,'./config')
  ],
})

export class ContainerConfiguration {
  @App()
  app: koa.Application;

  async onReady() {
    this.app.use(cors());
    await mongoose.connect('mongodb://localhost:27017/interest-circle');
    console.log('mongoose connect success');
  }
}