import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Task } from './entities';

@Module({
  controllers: [TasksController],
  providers: [TasksService],
  imports: [
    MikroOrmModule.forFeature([Task])
  ],
})
export class TasksModule { }
