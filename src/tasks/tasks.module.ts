import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { DatabaseModule } from 'src/database.module';
import { TasksController } from './tasks.controller';
import { tasksProviders } from './tasks.providers';
import { TasksService } from './tasks.service';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [TasksController],
  providers: [
    TasksService,
    ...tasksProviders,
  ],
})
export class TasksModule {}
