import { Provide } from '@midwayjs/decorator';
import { User } from '../model/user.model';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

@Provide()
export class UserService {
  async register(username: string, password: string) {
    console.log('Registering user:', username);
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.log('Username already exists:', username);
      throw new Error('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    console.log('User registered successfully:', username);
    return { message: 'User registered successfully' };
  }

  async login(username: string, password: string) {
    console.log('Logging in user:', username);
    const user = await User.findOne({ username });
    if (!user) {
      console.log('User not found:', username);
      throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log('Invalid password for user:', username);
      throw new Error('Invalid password');
    }

    const token = jwt.sign({ username: user.username }, 'your_secret_key', { expiresIn: '1h' });
    console.log('User logged in successfully:', username);
    return { token };
  }
}
