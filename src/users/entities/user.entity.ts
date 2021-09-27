import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Pet } from "./pet.entity";

//map one to one with database tables
@Entity()
export class User {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @ApiProperty()
    name: string;

    @Column()
    @ApiProperty()
    username: string;

    @Column()
    @ApiProperty()
    password: string;

    @ApiProperty()
    @OneToMany(type => Pet, pet => pet.owner)
    pets: Pet[]
}