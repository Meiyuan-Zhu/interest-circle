import { Configuration, App } from '@midwayjs/decorator';
import * as koa from '@midwayjs/koa';
import * as orm from '@midwayjs/orm';
import { join } from 'path';

@Configuration({
  imports: [
    koa,
    orm,
    require('@midwayjs/decorator'),
  ],
  importConfigs: [join(__dirname, './config')],
})
export class ContainerConfiguration {
  @App()
  app: koa.Application;
}
