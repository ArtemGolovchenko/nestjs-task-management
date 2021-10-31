import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
    constructor(
        @Inject('TASKS_REPOSITORY')
        private tasksRepository: typeof Task
    ) { }

    async getAllTask(): Promise<Task[]> {
        return await this.tasksRepository.findAll();
    }

    async getTaskById(id: string): Promise<Task> {
        const found = await this.tasksRepository.findOne({ where: { id: id } });
        if (!found) {
            throw new NotFoundException(`Task with id: ${id} not found`);
        }
        return found;
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const { title, description } = createTaskDto;

        const task = await this.tasksRepository.create({
            title,
            description,
            status: TaskStatus.OPEN,
        });

        return task;
    }

    async deleteTask(id: string): Promise<void> {
        const deltask = await this.getTaskById(id);
        await deltask.destroy();
    }

    async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
        const task = await this.getTaskById(id);
        await task.update({ status: status });
        return task;
    }
}