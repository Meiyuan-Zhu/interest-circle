import { Configuration, App } from '@midwayjs/decorator';
import * as koa from '@midwayjs/koa';
import * as typegoose from '@midwayjs/typegoose'
import { join } from 'path';

@Configuration({
  imports: [
    koa,
    typegoose,
    require('@midwayjs/decorator'),
  ],
  importConfigs: [join(__dirname, './config')],
})
export class ContainerConfiguration {
  @App()
  app: koa.Application;
}
