import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { InterestCircle } from './interestCircle.model';

class Comment {
  @prop({ required: true })
  username: string;

  @prop({ required: true })
  content: string;

  @prop({ default: Date.now })
  createdAt: Date;
}

export class Post {
  @prop({ ref: () => InterestCircle, required: true })
  circleId: Ref<InterestCircle>;

  @prop({ required: true })
  username: string;

  @prop({ required: true })
  content: string;

  @prop()
  image?: string;

  @prop({ default: Date.now })
  createdAt: Date;

  @prop({ type: () => [Comment], default: [] })
  comments: Comment[];
}

export const PostModel = getModelForClass(Post);




