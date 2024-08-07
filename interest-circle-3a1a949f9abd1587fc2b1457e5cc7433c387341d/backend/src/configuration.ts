import { Configuration, App } from "@midwayjs/core";
import * as koa from "@midwayjs/koa";
import * as mongoose from 'mongoose'
import { join } from 'path';
import * as upload from '@midwayjs/upload';
import * as cors from '@koa/cors';
import * as staticFile from '@midwayjs/static-file';




@Configuration({
  imports: [
    koa,
    upload,
    staticFile
    
  ],
  importConfigs: [
    join(__dirname,'./config')
  ],
})

export class ContainerConfiguration {
  @App()
  app: koa.Application;

  async onReady() {
    await mongoose.connect('mongodb://localhost:27017/interest-circle');
    console.log('mongoose connect success');
    
    this.app.use(cors({
      origin: '*',
      allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
    }));

    
  }
}