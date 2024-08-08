
import { Provide } from '@midwayjs/core';
import { prop, getModelForClass } from '@typegoose/typegoose';
import { Types } from 'mongoose';

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

  readonly _id: Types.ObjectId;
  
}

export const InterestCircleModel = getModelForClass(InterestCircle);

