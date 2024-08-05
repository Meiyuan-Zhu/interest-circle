import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user';
import { RegisterDTO, LoginDTO } from '../dto/user.dto';

@Provide()
export class UserService {

  @InjectEntityModel(User)
  userModel: Repository<User>;

  // save data
  async register(registerDTO: RegisterDTO) {
    const { username, password } = registerDTO;
    const existUser = await this.userModel.findOne({ where: { username } });
    if (existUser) {
      throw new Error('用户已存在');
    } else {
      const user = new User();
      user.username = username;
      user.password = password;
      await this.userModel.save(user);
      return '注册成功';
    }

  }

  // query data
  async login(loginDTO: LoginDTO) {
    const { username, password } = loginDTO;
    const user = await this.userModel.findOne({ where: { username } });
    if (!user) {
      throw new Error('用户不存在');
    } else {
      const isMatch = password === user.password; 
      if (!isMatch) {
        throw new Error('密码错误');
      } else {
        return user ;
      }
    }
  }
}
