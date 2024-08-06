import { Controller, Post, Body, Inject } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { UserService } from '../service/user.service';

@Controller('/api/users')
export class UserController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Post('/register')
  async register(@Body() user) {
    console.log('Register request received with data:', user);
    const { username, password } = user;
    try {
      const result = await this.userService.register(username, password);
      console.log('Registration result:', result);
      return { success: true, message: 'User registered successfully' };
    } catch (error) {
      console.error('Error during registration:', error);
      return { success: false, message: 'Registration failed', error };
    }
  }

  @Post('/login')
  async login(@Body() user) {
    console.log('Login request received with data:', user);
    const { username, password } = user;
    try {
      const result = await this.userService.login(username,password);
      if (result) {
        return { success: true, token: 'dummy_token' }; 
      } else {
        return { success: false, message: 'User not found' };
      }
    } catch (error) {
      console.error('Error during login:', error);
      return { success: false, message: 'Login failed', error };
    }
  }
}
