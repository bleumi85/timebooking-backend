import { EntityRepository } from '@mikro-orm/postgresql';
import { Schedule } from './entities';

export class ScheduleRepository extends EntityRepository<Schedule> {}
