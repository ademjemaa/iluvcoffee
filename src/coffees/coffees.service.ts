import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { off } from 'process';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

@Injectable()
export class CoffeesService {
    constructor(
        @InjectModel(Coffee.name) private readonly coffeeModel : Model<Coffee>,
        @InjectConnection() private readonly connection : Connection,
        
    ) {}

    findAll(paginationQuery : PaginationQueryDto) 
    {
        const { offset, limit } = paginationQuery;

        return this.coffeeModel.find()
            .skip(offset)
            .limit(limit)
            .exec();
    }

    async findOne(id : string)
    {
        const coffee = await this.coffeeModel.findOne({ _id : id }).exec();
        if (!coffee)
            throw new NotFoundException(`Coffee #[${id}] not found`);
        return coffee;
    }

    create(createCoffeesDto : CreateCoffeeDto)
    {
        const coffee = new this.coffeeModel(createCoffeesDto);
        return coffee.save();
    }

    async update(id: string, updateCoffeesDto : UpdateCoffeeDto)
    {
        const existingCoffee = await this.coffeeModel.
            findOneAndUpdate({ _id : id }, { $set : updateCoffeesDto }, { new : true })
            .exec();
        if (!existingCoffee)
            throw new NotFoundException(`Coffee #[${id}] not found`);
        return existingCoffee;

    }

    async remove(id: string)
    {
        const coffee = await this.findOne(id);
        return coffee.deleteOne();
    }

    async recommend(id : string)
    {
        const coffee = await this.findOne(id);
        const session = await this.connection.startSession();

        session.startTransaction();

        try {
            coffee.recommendations++;

            await coffee.save();

            await session.commitTransaction();
        } 
        catch (err) {
            await session.abortTransaction();
        } 
        finally {
            session.endSession();
        }

        return coffee;

    }
}
