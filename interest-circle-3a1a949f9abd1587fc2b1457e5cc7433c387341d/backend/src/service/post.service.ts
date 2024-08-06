import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { Post } from '../model/post.model';

@Provide()
export class PostService {
  @InjectEntityModel(Post)
  postModel: ReturnModelType<typeof Post>;

  async createPost(data: any) {
    return await this.postModel.create(data);
  }

  async getPosts(circleId: string) {
    return await this.postModel.find({ circleId });
  }
}
