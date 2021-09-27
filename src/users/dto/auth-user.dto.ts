import { ApiProperty } from "@nestjs/swagger";
import { IsAlphanumeric, MaxLength } from "class-validator";

export class AuthUserDTO {


    @ApiProperty()
    @IsAlphanumeric()
    @MaxLength(10)
    username: string

    @ApiProperty()
    @IsAlphanumeric()
    @MaxLength(10)
    password: string

}