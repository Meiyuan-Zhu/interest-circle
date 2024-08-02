import { Provide, Controller, Post, Body, Inject } from '@midwayjs/decorator';
import { UserService } from '../service/user.service';

@Provide()
@Controller('/api/users')
export class UserController {
  @Inject()
  userService: UserService;

  @Post('/register')
  async register(@Body() body) {
    try {
      const { username, password } = body;
      const user = await this.userService.register(username,password);
      return { success: true, message: '注册成功', data: user };
    } catch (error) {
      console.log(error);
      return { success: false, message: '注册失败', error: error.message };
      
    }
  }

  @Post('/login')
  async login(@Body() body) {
    try {
      const { username, password } = body;
      const token = await this.userService.login(username, password);
      if (token) {
        return { success: true, message: '登录成功', data: token };
      } else {
        return { success: false, message: '用户名或密码错误' };
      }
    } catch (error) {
      console.log(error);
      return { success: false, message: '登录失败', error: error.message };
    }
  }
}
