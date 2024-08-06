import { Provide } from '@midwayjs/core';
import { InterestCircle, InterestCircleModel } from '../model/interestCircle.model';

@Provide()
export class InterestCircleService {
    async createInterestCircle(data:any): Promise<InterestCircle> {
        const circle = new InterestCircleModel(data);
        return circle.save();
    }

    async getAllInterestCircles(page: number, limit: number): Promise<InterestCircle[]> {
        const skip = (page-1) * limit;
        return InterestCircleModel.find().skip(skip).limit(limit).exec();
    }

    async getInterestCircles(term: string): Promise<InterestCircle[]> {
        return InterestCircleModel.find({name: new RegExp(term, 'i')}).exec();
    }

    async getCircleById (circleId: string): Promise<InterestCircle> {
        return InterestCircleModel.findById(circleId).exec();
    }
}