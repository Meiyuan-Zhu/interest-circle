import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { InterestCircle } from './interestCircle.model';

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
}

export const PostModel = getModelForClass(Post);
