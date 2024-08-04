import { Body, Controller, Inject, Post, Provide } from "@midwayjs/core";
import { InterestCircleService } from "../service/interestCircle.service";
import { CreateInterestCircleDto } from "../dto/interestCircle.dto";


@Provide()
@Controller('/api/interest-circles')
export class InterestCircleController {
    @Inject()
    interestCircleService: InterestCircleService;

    @Post('/create')
    async create(@Body() body: CreateInterestCircleDto): Promise<any> {
        try{
            const interestCircle = await this.interestCircleService.createInterestCircle(body);
            return {success: true, message: '兴趣圈创建成功', data: interestCircle}
        } catch (error) {
            console.log(error);
            return {success: false, message: '兴趣圈创建失败', data: error}
        }
    }
}