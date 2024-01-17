import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
    private coffees: Coffee[] = [
        {
            id : 1,
            name : "Espresso",
            brand : "Lavazza",
            flavors : ['chocolate', 'vanille']
        },
    ];

    findAll() 
    {
        return this.coffees;
    }

    findOne(id : number)
    {
        const coffee = this.coffees.find(item => item.id === id);
        if (!coffee)
            throw new NotFoundException(`Coffee #[${id}] not found`);
        return coffee;
    }

    create(createCoffeesDto : any)
    {
        this.coffees.push(createCoffeesDto);
    }

    update(id: string, updateCoffeesDto : any)
    {
        const existingCoffeeIndex = this.coffees.findIndex(item => item.id === +id);
        
        if (existingCoffeeIndex !== -1)
        {
            this.coffees[existingCoffeeIndex] = {
                ...this.coffees[existingCoffeeIndex],
                ...updateCoffeesDto
            }
            return true;
        }
        return false;
    }

    remove(id: string)
    {
        const existingCoffeeIndex = this.coffees.findIndex(item => item.id === +id);

        if (existingCoffeeIndex !== -1)
        {
            this.coffees.splice(existingCoffeeIndex, 1);
            return true;
        }

    return false;
    }
}
