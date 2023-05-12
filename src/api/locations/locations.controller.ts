import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { RoleGuard } from '../users/role.guard';
import { Roles } from '../users/roles.decorator';
import { Role } from '../users/users.interface';

const name = 'locations';

@Controller(name)
@ApiTags(name)
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RoleGuard)
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Post()
  create(@Body() createLocationDto: CreateLocationDto) {
    return this.locationsService.create(createLocationDto);
  }

  @Get()
  @Roles(Role.ADMIN)
  async findAll() {
    return await this.locationsService.findAll();
  }

  @Get('users/:id')
  @Roles(Role.USER, Role.VISITOR)
  async findAllByUser(@Param('id') id: string) {
    return await this.locationsService.findAllByUser(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.locationsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLocationDto: UpdateLocationDto) {
    return this.locationsService.update(+id, updateLocationDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.locationsService.remove(id);
  }
}
