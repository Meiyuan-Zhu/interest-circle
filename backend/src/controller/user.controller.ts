import { Controller, Post, Provide, Body, Inject } from '@midwayjs/decorator';
import { UserService } from '../service/user.service';;
import { RegisterDTO, LoginDTO} from '../dto/user.dto';

@Provide()
@Controller('/api/users')
export class UserController {
    @Inject()
    userService: UserService;

    @Post('/register')
    async register(@Body() registerDTO: RegisterDTO) {
        return this.userService.register(registerDTO);
    }

    @Post('/login')
    async login(@Body() loginDTO: LoginDTO) {
        return this.userService.login(loginDTO);
    }
}
