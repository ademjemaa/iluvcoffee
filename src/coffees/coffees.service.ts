import { Injectable } from '@nestjs/common';
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

    findOne(id : string)
    {
        return this.coffees.find(item => item.id === +id);
    }

    create(createCoffeesDto : any)
    {

    }

    update(id: string, updateCoffeesDto : any)
    {

    }

    remove(id: string)
    {
        
    }
}
