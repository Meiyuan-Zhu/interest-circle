import { Provide } from '@midwayjs/decorator';
import { Post, PostModel } from '../model/post.model';

@Provide()
export class PostService {

  async createPost(data: any): Promise<Post> {
    const post = new PostModel(data);
    return post.save();
  }

  async getPosts(circleId: string): Promise<Post[]> {
    return PostModel.find({ circleId });
  }
}
