import { Provide } from '@midwayjs/core';
import { InterestCircle, InterestCircleModel } from '../model/interestCircle.model';

@Provide()
export class InterestCircleService {
    async createInterestCircle(data:any): Promise<InterestCircle> {
        const circle = new InterestCircleModel(data);
        return circle.save();
    }

    async getAllInterestCircles(): Promise<InterestCircle[]> {
        return InterestCircleModel.find().exec();
    }

    async getInterestCircles(term: string): Promise<InterestCircle[]> {
        return InterestCircleModel.find({name: new RegExp(term, 'i')}).exec();
    }
}