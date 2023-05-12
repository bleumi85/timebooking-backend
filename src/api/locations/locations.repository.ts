import { EntityRepository } from '@mikro-orm/postgresql';
import { Location } from './entities';

export class LocationRepository extends EntityRepository<Location> {}
