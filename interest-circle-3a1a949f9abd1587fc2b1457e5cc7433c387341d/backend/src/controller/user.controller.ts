import { Controller, Inject, Provide, Post, Body } from "@midwayjs/core";
import { UserService } from "../service/user.service";

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
            return { success: false, message: error.message };
        }
    }
}