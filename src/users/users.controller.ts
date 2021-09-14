import { Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Post } from '@nestjs/common';
import { Query } from '@nestjs/common/decorators/http/route-params.decorator';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor (private usersService: UsersService) {}

    @ApiOkResponse({type: User, isArray: true})
    @ApiQuery({name:"name", required: false})
    @Get()
    // getUsers(@Query('name') name: string): User[] {
    //     return this.usersService.findAll(name);
    // }

    getAllUsers(): Promise<User[]>{
        return this.usersService.getAll();
    }

    @ApiOkResponse({type: User, description:"The user"})
    @ApiNotFoundResponse()
    @Get(':id')
    getUSerById(@Param('id', ParseIntPipe) id: number ): User {

        const user =  this.usersService.findById(id);

        if (!user) {
            throw new NotFoundException;
        }

        return user;
    }

    @ApiCreatedResponse({type: User})
    @ApiBadRequestResponse()
    @Post()
    // createUser(@Body() body: CreateUserDto): User {
    //     return this.usersService.createUser(body);
    // } 

    ftiaxeUser(@Body() body: CreateUserDto): Promise<User> {
        return this.usersService.createUser(body);
    }
}
