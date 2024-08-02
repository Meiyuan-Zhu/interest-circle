import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { User } from '../entity/user';
import { IUserOptions } from '../interface';
import * as jwt from 'jsonwebtoken';
import { Config } from "@midwayjs/core";



@Provide()
export class UserService {

  @InjectEntityModel(User)
  userModel: ReturnModelType<typeof User>;

  @Config('jwt.secret')
  secret: string;

  async register(username: string, password: string){
    return await this.userModel.create({ username, password});
  }

  async login(username: string, password: string) {
    const user = await this.userModel.findOne({username}).exec();
    if (!user) {
      throw new Error('用户不存在');
    } else {
      const isMatch = (password === user.password); 
      if (!isMatch) {
        throw new Error('密码错误');
      } else {
        const token = jwt.sign({ uid: user.id, username: user.username }, this.secret, {expiresIn: '2h'}); 
        return { token };
      }
    }
  }
  
  async getUser(options: IUserOptions) {
    return {
      uid: options.uid,
      username: 'test',
      password: 'test',
      email:'xxx.xxx@xxx.com'
    }
  }
}
