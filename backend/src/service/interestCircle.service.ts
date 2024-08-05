import { Provide } from '@midwayjs/core';
import { CreateInterestCircleDto } from '../dto/interestCircle.dto';
import { InterestCircle } from '../entity/interestCircle';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';

@Provide()
export class InterestCircleService {
    @InjectEntityModel(InterestCircle)
    interestCircleModel: Repository<InterestCircle>;

    async createInterestCircle(createInterestCircleDto: CreateInterestCircleDto) {
        const {name, description, createdBy} = createInterestCircleDto;
        const interestCircle = new InterestCircle();
        interestCircle.name = name;
        interestCircle.description = description;
        interestCircle.createdBy = createdBy;
        interestCircle.createdAt = new Date();
        return await this.interestCircleModel.save(interestCircle);

    }

    async getAllInterestCircles() {
        return await this.interestCircleModel.find();
    }
}