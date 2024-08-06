import { Inject, Controller, Post, Get, Query, Fields, File, Config } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { InterestCircleService } from '../service/interestCircle.service';
import { join } from 'path';
import * as fs from 'fs-extra';

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
    @File() file: any
  ) {
    const { name, description, createdBy, createdAt } = fields;

    let imagePath = '';
    if (file && file.path) {
      const fileName = `${Date.now()}_${file.filename}`;
      imagePath = join(this.uploadConfig.tmpdir, fileName);
      await fs.move(file.filepath, imagePath);
    } else {
      console.error('File upload error: file or filepath is undefined');
    }

    const data = { name, description, createdBy, createdAt, image: imagePath };
    try {
      const circle = await this.interestCircleService.createInterestCircle(data);
      this.ctx.body = { success: true, circle };
    } catch (error) {
      console.error('Error creating interest circle:', error);
      this.ctx.body = {success: false, message: 'Error creating interest circle'};
    }
  }
  @Get('/')
  async getAllInterestCircles() {
    const circles = await this.interestCircleService.getAllInterestCircles();
    this.ctx.body = circles;
  }

  @Get('/search')
  async searchInterestCircles(@Query('term') term: string) {
    const circles = await this.interestCircleService.getInterestCircles(term);
    this.ctx.body = circles;
  }

    
}