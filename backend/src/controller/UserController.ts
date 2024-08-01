import { Provide, Controller, Post, Body, Inject } from '@midwayjs/core';
import { Context } from 'koa';
import { User } from '../models/User';
import { Repository } from 'typeorm';

@Provide()
@Controller('/api/users')
export class UserController {
  @Inject()
  ctx: Context;

  @Inject()
  userRepository: Repository<User>;

  @Post('/register')
  async registerUser(@Body() body: any) {
    const { username, password } = body;
    const newUser = this.userRepository.create({ username, password });
    await this.userRepository.save(newUser);
    return { message: 'User registered successfully' };
  }
}
