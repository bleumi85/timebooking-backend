import { Module } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { SchedulesController } from './schedules.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Schedule } from './entities';

@Module({
  controllers: [SchedulesController],
  providers: [SchedulesService],
  imports: [
    MikroOrmModule.forFeature([Schedule])
  ],
})
export class SchedulesModule {}
