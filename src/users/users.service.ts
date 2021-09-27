import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor (@InjectRepository(User) private UsersRepository: Repository<User>, ){}

    private users: User[] = [
        { id: 0, name: 'Bill', username: "Mumbo", password:"Jumbo",  pets:[]},
        { id: 1, name: 'Antonis', username: "antonis", password:"1234",  pets:[]},
    ]; 

    inMemoryfindAll(name?: string): User[]{
        if (name){
           return this.users.filter((user) => user.name === name);
        }
        return this.users;
    }

    inMemoryfindById(userId: number): User {
        return this.users.find(user => user.id === userId);
    }

    InMemorycreateUsers(createUserDto: CreateUserDto): User {
        const newUser = {id: Date.now(), ...createUserDto}

        this.users.push(newUser);

        return newUser;
    }

    inDBgetAll(): Promise<User[]> {
        return this.UsersRepository.find({
            relations: ['pets']
        });
    }

    async inDBgetOneById(id: number): Promise<User> {
        try {
            const user = await this.UsersRepository.findOneOrFail(id);
            return user;
        } catch (error) {
            //handle error
            throw error;
        }
    }

    inDBcreateUser(createUserDto: CreateUserDto): Promise<User>{

        const newUser = this.UsersRepository.create({id: Date.now(), ...createUserDto});

        return this.UsersRepository.save(newUser);
    }

   async inDBupdateUser(id: number, name: string): Promise<User> {

        const user = await this.inDBgetOneById(id);

        user.name = name;

        return this.UsersRepository.save(user);
    }


    async inDBdeleteUser(id: number) : Promise<User> {
        const user = await this.inDBgetOneById(id);
    
        await this.UsersRepository.remove(user);

        return user;
    }

    async passportProtectedFindOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
    }
}
