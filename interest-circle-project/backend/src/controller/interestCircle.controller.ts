import { Inject, Controller, Post, Get, Query, Fields, Config, Param } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { InterestCircleService } from '../service/interestCircle.service';
import { InterestCircleModel } from '../model/interestCircle.model';


@Controller('/api/circles')
export class InterestCircleController {
    @Inject()
    ctx: Context;

    @Inject()
    interestCircleService: InterestCircleService;

    @Config('upload')
    uploadConfig;

  @Post('/')
  async createInterestCircle(
    @Fields() fields: any,
  ) {
    const { name, description, createdBy, createdAt } = fields;

    const data = { name, description, createdBy, createdAt };
    try {
      const circle = await this.interestCircleService.createInterestCircle(data);
      this.ctx.body = { success: true, circle };
    } catch (error) {
      console.error('Error creating interest circle:', error);
      this.ctx.body = {success: false, message: 'Error creating interest circle'};
    }
  }
  @Get('/')
  async getAllInterestCircles(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
  ) {
    const skip = (page - 1) * limit;
    try {
      const [circles, totalRecords] = await Promise.all([
        InterestCircleModel.find().skip(skip).limit(limit).lean().exec(),
        InterestCircleModel.countDocuments().exec()
      ]);
      const totalPages = Math.ceil(totalRecords / limit);
      this.ctx.body = { circles, totalPages };
    } catch (error) {
      console.error('Error fetching interest circles:', error);
      this.ctx.body = { success: false, message: 'Error fetching interest circles' };
    }
  }

  @Get('/search')
  async searchInterestCircles(@Query('term') term: string) {
    const circles = await this.interestCircleService.getInterestCircles(term);
    this.ctx.body = circles;
  }

  @Get('/:circleId')
  async getCircleDetails(@Param('circleId') circleId: string) {
    try {
      const circle = await this.interestCircleService.getCircleById(circleId);
      this.ctx.body = circle;
    } catch (error) {
      console.error('Error fetching circle details:',error);
      this.ctx.body = {success: false, message: 'Error fetching circle details'};
    }
  }

    
}