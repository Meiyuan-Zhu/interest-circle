import { Configuration } from '@midwayjs/core';
import { join } from 'path';
import * as orm from '@midwayjs/typeorm';


@Configuration({
  imports: [
    orm,
  ],
  importConfigs: [
    join(__dirname, './config')
  ]
})

export class MainConfiguration {

}
