import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../models/user';
import { RegisterDTO, LoginDTO } from '../dto/UserDTO';
import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { Config } from '@midwayjs/decorator';

@Provide()
export class UserService {
  @InjectEntityModel(User)
  userModel: Repository<User>;

  @Config('jwt.secret')
  jwtSecret: string;


  async register(registerDTO: RegisterDTO) {
    const { username, password } = registerDTO;
    const user = new User();
    user.username = username;
    user.password = await hash(password, 10);
    return this.userModel.save(user);
  }

  async login(loginDTO: LoginDTO) {
    const { username, password } = loginDTO;
    const user = await this.userModel.findOne({ where: { username } });
    if (!user || !(await compare(password, user.password))) {
      throw new Error('Invalid username or password');
    }
    const token = sign({ id: user.id }, this.jwtSecret, { expiresIn: '1h' });
    return { token };
  }
}
