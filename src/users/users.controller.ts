import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { identity } from 'rxjs';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Get()
    getAllUsers(): Promise<User[]> {
        return this.usersService.getAllUsers();
    }

    @Post()
    createUser(@Body() CreateUserDto: CreateUserDto): Promise<User> {
        return this.usersService.createUser(CreateUserDto);
    }

    @Get('/:id')
    getTaskByUserId(@Param('id') id: string): Promise<User> {
        return this.usersService.getTaskByUserId(id);
    }
}
