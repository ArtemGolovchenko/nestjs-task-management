import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database.module';
import { TasksController } from './tasks.controller';
import { tasksProviders } from './tasks.providers';
import { TasksService } from './tasks.service';

@Module({
  imports: [DatabaseModule],
  controllers: [TasksController],
  providers: [
    TasksService,
    ...tasksProviders,
  ],
})
export class TasksModule {}
