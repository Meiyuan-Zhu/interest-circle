import { Body, Config, Controller, Fields, File, Get, Inject, Param, Post } from "@midwayjs/core";
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
      const targetPath = join(this.uploadConfig.uploaddir, fileName);

      console.log('Temporary file path:', tmpPath);
      console.log('Target path:', targetPath);
      
      try {
        await fs.move(tmpPath, targetPath);
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
      console.log('Post created successfully:', post);
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

  @Post('/:circleId/posts/:postId/comments')
  async addComment(
    @Param('postId') postId: string,
    @Body() comment: { username: string, content: string }
  ) {
    try {
      const post = await this.postService.addComment(postId, comment);
      console.log(`Comment added successfully to post: ${postId}`);
      this.ctx.body = { success: true, post };
    } catch (error) {
      console.error('Error adding comment:', error);
      this.ctx.body = { success: false, message: 'Error adding comment' };
    }
  }

  @Get('/:circleId/posts/:postId/comments')
  async getComments(@Param('postId') postId: string) {
    console.log(`Received request to fetch comments for post: ${postId}`);
    try {
      const comments = await this.postService.getComments(postId);
      console.log(`Comments fetched successfully for post: ${postId}`);
      this.ctx.body = { success: true, comments };
    } catch (error) {
      console.log(`Error fetching comments for post: ${postId} - ${error.message}`);
      this.ctx.body = { success: false, message: error.message };
    }
  }

  @Get('/:circleId/user-activity-stats')
  async getUserActivityStats(@Param('circleId') circleId: string) {
    try {
      const userStats = await this.postService.getUserActivityStats(circleId);
      this.ctx.body = { success: true, userStats };
    } catch (error) {
      console.error('Error fetching user activity stats:', error);
      this.ctx.body = { success: false, message: 'Error fetching user activity stats' };
    }
  }
}

