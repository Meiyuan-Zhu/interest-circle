import { Configuration, App, IMidwayContainer } from '@midwayjs/core';
import { join } from 'path';
import * as orm from '@midwayjs/typeorm';
import * as koa from '@midwayjs/koa';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { ILifeCycle } from '@midwayjs/core';



@Configuration({
  imports: [
    orm,
    koa,
  ],
  importConfigs: [
    join(__dirname, './config')
  ]
})

export class ContainerLifeCycle implements ILifeCycle {
  @App()
  app: koa.Application;

  async onReady(container: IMidwayContainer) {
    const dataSource = await container.getAsync(DataSource);
    if (dataSource.isInitialized) {
      console.log('Database connection established successfully.');
    } else {
      console.error('Failed to establish database connection.');
    }
  }
}
