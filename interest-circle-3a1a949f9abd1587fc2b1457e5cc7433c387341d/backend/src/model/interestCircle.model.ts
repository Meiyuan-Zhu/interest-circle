
import { Provide } from '@midwayjs/core';
import { prop, getModelForClass } from '@typegoose/typegoose';

@Provide()
export class InterestCircle {
  @prop({required: true})
  name: string;

  @prop({required: true })
  description: string;

  @prop({required: true})
  createdBy: string;

  @prop({required: true})
  createdAt: Date;

  @prop()
  image: string;
}

export const InterestCircleModel = getModelForClass(InterestCircle);

