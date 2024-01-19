import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateCoffeeDto {
    @ApiProperty({ description : "name of the coffee", example : "Expresso" })
    @IsString()
    readonly name : string;

    @ApiProperty({ description : "Brand of the coffee", example : "lavazza"})
    @IsString()
    readonly brand : string;

    @ApiProperty({ description : "flavors that the coffee can have", example : ["chocolate", "vanille"] })
    @IsString({ each : true })
    readonly flavors : string[];
}
