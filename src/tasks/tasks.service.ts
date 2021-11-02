import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
    constructor(
        @Inject('TASKS_REPOSITORY')
        private tasksRepository: typeof Task
    ) { }

    async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
        const { Op } = require("sequelize");
        const { status, search } = filterDto;
        if (status) {
            return await this.tasksRepository.findAll({ where: { status: status, user_id: user.id } });
        }

        if (search) {
            return await this.tasksRepository.findAll({
                where: {
                    [Op.or]: [{
                        title: {
                            [Op.iLike]: `%${search}%`
                        }
                    },
                    {
                        description: {
                            [Op.iLike]: `%${search}%`
                        }
                    },
                    ],
                    user_id: user.id
                }
            });
        }
    }

    async getTaskById(id: string, user: User): Promise<Task> {
        const found = await this.tasksRepository.findOne({ where: { id: id, user_id: user.id } });
        if (!found) {
            throw new NotFoundException(`Task with id: ${id} not found`);
        }
        return found;
    }

    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        const { title, description } = createTaskDto;
        try {
            const task = await this.tasksRepository.create({
                user_id: user.id,
                title,
                description,
                status: TaskStatus.OPEN,
            });

            return task;

        } catch (error) {
            throw new ConflictException(error);
        }
    }

    async deleteTask(id: string, user: User): Promise<void> {
        const deltask = await this.getTaskById(id, user);
        await deltask.destroy();
    }

    async updateTaskStatus(id: string, status: TaskStatus, user: User): Promise<Task> {
        const task = await this.getTaskById(id, user);
        await task.update({ status: status });
        return task;
    }
}