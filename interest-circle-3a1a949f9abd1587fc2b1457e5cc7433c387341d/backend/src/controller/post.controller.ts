import { Config, Controller, Fields, File, Get, Inject, Param, Post } from "@midwayjs/core";
import { Context } from "@midwayjs/koa";
import { PostService } from '../service/post.service';
import { join } from "path";
import * as fs from 'fs-extra';

@Controller('/api/circles')
export class PostController {
  @Inject()
  ctx: Context;

  @Inject()
  postService: PostService;

  @Config('upload')
  uploadConfig;

  @Post('/:circleId/posts')
  async createPost(
    @Param('circleId') circleId: string,
    @Fields() fields: any,
    @File() file: any,
  ) {
    const { content, username } = fields;
    
    let fileName = '';
    console.log('File:', file);

    if (file && file.data) {
      fileName = `${Date.now()}_${file.filename}`;
      const tmpPath = file.data;
      const tragetPath = join(this.uploadConfig.uploaddir, fileName);

      console.log('Temporary file path:', tmpPath);
      console.log('Target path:',tragetPath);
      
      try {
        await fs.move(tmpPath, tragetPath);
        console.log('File moved successfully');
        
      } catch (error) {
        console.error('Error moving file:', error);
      }
    } else {
      console.error('File upload error: file or filepath is undefined');
    }

    const imagePath = `/public/uploads/images/${fileName}`;
    console.log('Image path:', imagePath);
    const data = { content, username, circleId, image: imagePath };

    try {
      const post = await this.postService.createPost(data);
      console.log('Post created successfully:',post);
      this.ctx.body = { success: true, post };

    } catch (error) {
      
      console.error('Error creating post:', error);
      this.ctx.body = { success: false, message: 'Error creating post' };
    }
  }

  @Get('/:circleId/posts')
  async getCirclePosts(@Param('circleId') circleId: string) {
    try {
      const posts = await this.postService.getPosts(circleId);
      this.ctx.body = posts;
    } catch (error) {
      console.error('Error fetching circle posts:', error);
      this.ctx.body = { success: false, message: 'Error fetching circle posts' };
    }
  }
}
