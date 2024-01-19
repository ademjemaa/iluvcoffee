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
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { ApiResponse, ApiNotFoundResponse } from '@nestjs/swagger';

@Controller('coffees')
export class CoffeesController {
    constructor(private readonly coffeesService : CoffeesService) {}

    @ApiResponse({ status : HttpStatus.OK, description : "OK" })
    @Get()
    async findAll(@Query() paginationQuery : PaginationQueryDto) {

        return await this.coffeesService.findAll(paginationQuery);
    }

    @ApiResponse({ status : HttpStatus.OK, description : "OK" })
    @ApiResponse({ status : HttpStatus.NOT_FOUND, description : "your coffee was not found" })
    @Get('recommend/:id')
    async recommend(@Param('id') id: string)
    {
        return this.coffeesService.recommend(id);
    }


    @ApiResponse({ status : HttpStatus.OK, description : "OK" })
    @ApiResponse({ status : HttpStatus.NOT_FOUND, description :  "your coffee was not found ",
    content  :{  }
 })
    @Get(':id')
    async findOne(@Param('id') id: string) {
        let coffee = await this.coffeesService.findOne(id);

        coffee = coffee.toObject();
        const { __v, ...resultat } = coffee;

        return resultat;
    }

    @ApiResponse({ status : HttpStatus.CREATED, description : "Your Coffee was created" })
    @ApiResponse({ status : HttpStatus.BAD_REQUEST, description : "The request was rejected, please check you have used the correct fields" })
    @Post()
    create(@Body() createCoffeeDto : CreateCoffeeDto) {
        return this.coffeesService.create(createCoffeeDto);
    }

    @ApiResponse({ status : HttpStatus.OK, description : "OK" })
    @ApiNotFoundResponse({ description : "Your Coffee was not found" })
    @ApiResponse({ status : HttpStatus.BAD_REQUEST, description : "The request was rejected, please check you have used the correct fields" })
    @Patch(':id')
    update(@Param('id') id:string, @Body() updateCoffeeDto : UpdateCoffeeDto)
    {
        return this.coffeesService.update(id, updateCoffeeDto);
    }

    @ApiResponse({ status : HttpStatus.OK, description : "OK" })
    @ApiNotFoundResponse({ description : "Your Coffee was not found" })
    @Delete(':id')
    remove(@Param('id') id: string)
    {
        return this.coffeesService.remove(id);
    }

}
