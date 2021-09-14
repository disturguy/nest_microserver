import { ApiProperty } from "@nestjs/swagger";
import { IsAlphanumeric, MaxLength } from "class-validator";
import { Pet } from "../entities/pet.entity";

export class CreateUserDto {
    @ApiProperty()
    @IsAlphanumeric()
    @MaxLength(10)
    name: string

    @ApiProperty()
    @IsAlphanumeric()
    @MaxLength(10)
    pets: Pet[]
}