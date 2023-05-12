import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';
import { v4 } from 'uuid';

@Entity({ abstract: true })
export class AbstractEntity {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  @ApiProperty()
  id: string = v4();

  @Property({ defaultRaw: 'current_timestamp' })
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date(), nullable: true })
  updatedAt: Date;
}
