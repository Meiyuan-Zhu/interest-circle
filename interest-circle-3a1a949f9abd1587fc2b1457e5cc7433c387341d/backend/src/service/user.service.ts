import { IUserOptions } from '../interface';
import { Provide, Config } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../models/user';
import { RegisterDTO, LoginDTO} from '../dto/user.dto';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

@Provide()
export class UserService {

  @InjectEntityModel(User)
  userModel: Repository<User>;

  @Config('jwt.secret')
  jwtSecret: string;

  async getUser(options: IUserOptions) {
    return {
      uid: options.uid,
      username: 'mockedName',
      phone: '12345678901',
      email: 'xxx.xxx@xxx.com',
    };
  }

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
      const isMatch = await compare(password, user.password);
      if (!isMatch) {
        throw new Error('密码错误');
      } else {
        const token = sign({ id: user.id, username: user.username }, this.jwtSecret, { expiresIn: '1h' });
        return {token};
      }
    }
  } 
  
}
