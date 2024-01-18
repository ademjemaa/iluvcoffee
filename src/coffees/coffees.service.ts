import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Injectable()
export class CoffeesService {
    constructor(
        @InjectModel(Coffee.name) private readonly coffeeModel : Model<Coffee>,
    ) {}

    findAll() 
    {
        return this.coffeeModel.find().exec();
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
}
