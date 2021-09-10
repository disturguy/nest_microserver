import { ApiProduces, ApiProperty } from "@nestjs/swagger";

//map one to one with database tables
export class User {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;
}