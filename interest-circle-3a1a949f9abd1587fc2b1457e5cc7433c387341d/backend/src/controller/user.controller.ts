import { Provide, Controller, Post, Body, Inject } from '@midwayjs/decorator';
import { UserService } from '../service/user.service';

@Provide()
@Controller('/api/users')
export class UserController {
  @Inject()
  userService: UserService;

  @Post('/register')
  async register(@Body() body: any) {
    const { username, password } = body;
    try {
      const result = await this.userService.register(username, password);
      return { success: true, message: result.message };
    } catch (error) {
      console.error('Error registering user:', error.message);
      return { success: false, message: error.message };
    }
  }

  @Post('/login')
  async login(@Body() body: any) {
    const { username, password } = body;
    try {
      const result = await this.userService.login(username, password);
      return { success: true, token: result.token };
    } catch (error) {
      console.error('Error logging in user:', error.message);
      return { success: false, message: error.message };
    }
  }
}
