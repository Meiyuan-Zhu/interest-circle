import { Provide } from "@midwayjs/core";
import { User } from '../models/user.model';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';


@Provide()
export class UserService {
  async register(username:string, password:string) {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword })
    await user.save();
    return { message: 'User registered successfully' };
  }

  async login(username: string, password: string) {
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error('Invalid username or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    const token = jwt.sign({ username: user.username }, 'secret', {expiresIn: '1h'});
    return { token };
  }
}
