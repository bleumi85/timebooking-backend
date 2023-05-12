import { Module } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationsController } from './locations.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Location } from './entities';

@Module({
  controllers: [LocationsController],
  providers: [LocationsService],
  imports: [
    MikroOrmModule.forFeature([Location])
  ],
})
export class LocationsModule { }
