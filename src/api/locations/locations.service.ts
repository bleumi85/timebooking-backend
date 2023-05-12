import { Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { LocationRepository } from './locations.repository';

@Injectable()
export class LocationsService {
  constructor(
    private readonly locationRepository: LocationRepository,
  ) { }

  create(createLocationDto: CreateLocationDto) {
    return 'This action adds a new location';
  }

  async findAll() {
    return await this.locationRepository.findAll({
      populate: ['user'],
      fields: ['title', 'color', 'icon', 'showCompleteMonth', { user: ['id', 'firstName', 'lastName'] }]
    });
  }

  async findAllByUser(id: string) {
    return { message: `This action gives all loctions by a #${id} user` }
  }

  findOne(id: number) {
    return `This action returns a #${id} location`;
  }

  update(id: number, updateLocationDto: UpdateLocationDto) {
    return `This action updates a #${id} location`;
  }

  async remove(id: string) {
    return { message: `This action removes a #${id} location` }
  }
}
