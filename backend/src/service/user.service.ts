import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import { User } from '../models/user';
import { IUserOptions } from '../interface';
import { LoginDTO, RegisterDTO } from '../dto/user.dto';
@Provide()
export class UserService {
  @InjectEntityModel(User)
  userModel: Repository<User>;

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
        const token = 'some-jwt-token'; 
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
