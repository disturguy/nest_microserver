import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor (@InjectRepository(User) private UsersRepository: Repository<User>, ){}

    private users: User[] = [
        { id: 0, name: 'Bill', pets:[]},
        { id: 1, name: 'Antonis',pets:[] },
        { id: 2, name: 'Charis', pets:[] }
    ]; 

    findAll(name?: string): User[]{
        if (name){
           return this.users.filter((user) => user.name === name);
        }
        return this.users;
    }

    findById(userId: number): User {
        return this.users.find(user => user.id === userId);
    }

    createUsers(createUserDto: CreateUserDto): User {
        const newUser = {id: Date.now(), ...createUserDto}

        this.users.push(newUser);

        return newUser;
    }

    getAll(): Promise<User[]> {
        return this.UsersRepository.find({
            relations: ['pets']
        });
    }

    async getOneById(id: number): Promise<User> {
        try {
            const user = await this.UsersRepository.findOneOrFail(id);
            return user;
        } catch (error) {
            //handle error
            throw error;
        }
    }

    createUser(createUserDto: CreateUserDto): Promise<User>{

        const newUser = this.UsersRepository.create({id: Date.now(), ...createUserDto});

        return this.UsersRepository.save(newUser);
    }

   async updateUser(id: number, name: string): Promise<User> {

        const user = await this.getOneById(id);

        user.name = name;

        return this.UsersRepository.save(user);
    }


    async deleteUser(id: number) : Promise<User> {
        const user = await this.getOneById(id);
    
        await this.UsersRepository.remove(user);

        return user;
    }
}
