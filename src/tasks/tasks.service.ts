import { Inject, Injectable } from '@nestjs/common';
import { Task } from './task.entity';
@Injectable()
export class TasksService {
    constructor(
        @Inject('TASKS_REPOSITORY')
        private tasksRepository: typeof Task
    ) { }

    async findAll(): Promise<Task[]> {
        return this.tasksRepository.findAll<Task>();
    }
}