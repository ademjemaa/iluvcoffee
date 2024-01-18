import { 
    Body,
    Controller,
    Get,
    Param,
    Post,
    HttpCode,
    HttpStatus,
    Res,
    Patch,
    Delete,
    Query,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Controller('coffees')
export class CoffeesController {
    constructor(private readonly coffeesService : CoffeesService) {}
    @Get()
    async findAll(@Query() paginationQuery) {
        const { offset, limit } = paginationQuery;
        
        return await this.coffeesService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        let coffee = await this.coffeesService.findOne(id);

        coffee = coffee.toObject();
        const { __v, ...resultat } = coffee;

        return resultat;
    }

    @Post()
    create(@Body() createCoffeeDto : CreateCoffeeDto) {
        return this.coffeesService.create(createCoffeeDto);
    }

    @Patch(':id')
    update(@Param('id') id:string, @Body() updateCoffeeDto : UpdateCoffeeDto)
    {
        return this.coffeesService.update(id, updateCoffeeDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string)
    {
        return this.coffeesService.remove(id);
    }

}
