import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { where } from 'sequelize';
import { Task } from 'src/tasks/task.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(
        @Inject('USERS_REPOSITORY')
        private usersRepository: typeof User
    ) { }

    async getAllUsers(): Promise<User[]> {
        return await this.usersRepository.findAll();
    }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const { first_name, last_name, email } = createUserDto;

        const task = await this.usersRepository.create({
            first_name,
            last_name,
            email,
        });

        return task;
    }

    async getTaskByUserId(id: string): Promise<User> {
        const found = await this.usersRepository.findOne({where: {id:id}, include: [Task] });
        if (!found) {
            throw new NotFoundException(`Task with id: ${id} not found`);
        }
        return found;
    }

}