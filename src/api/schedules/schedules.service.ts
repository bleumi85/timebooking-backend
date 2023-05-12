import { Injectable } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { ScheduleRepository } from './schedules.repository';

@Injectable()
export class SchedulesService {
  constructor(
    private readonly scheduleRepository: ScheduleRepository,
  ) { }

  create(createScheduleDto: CreateScheduleDto) {
    return 'This action adds a new schedule';
  }

  async findAll() {
    return await this.scheduleRepository.findAll({
      fields: ['*', { user: ['id', 'firstName', 'lastName'], location: ['title'], task: ['title'] }]
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} schedule`;
  }

  update(id: number, updateScheduleDto: UpdateScheduleDto) {
    return `This action updates a #${id} schedule`;
  }

  remove(id: number) {
    return `This action removes a #${id} schedule`;
  }
}
