import {
  Cascade,
  Collection,
  Entity,
  EntityRepositoryType,
  Enum,
  OneToMany,
  Property,
  Unique,
} from '@mikro-orm/core';
import { IsEmail } from 'class-validator';
import { AbstractEntity } from '../../../common/entities';
import { Role } from '../users.interface';
import { UserRepository } from '../users.repository';
import { RefreshToken } from '../../refresh-tokens/entities';
import { ApiProperty } from '@nestjs/swagger';
import { Location } from '../../locations/entities';
import { Task } from '../../tasks/entities';
import { Schedule } from '../../schedules/entities';

const roles = Object.values(Role);

@Entity({ tableName: 'users', customRepository: () => UserRepository })
@Unique({
  properties: ['firstName', 'lastName'],
  name: 'users_full_name_unique',
})
export class User extends AbstractEntity {
  [EntityRepositoryType]?: UserRepository;

  @Property()
  @ApiProperty()
  firstName: string;

  @Property()
  @ApiProperty()
  lastName: string;

  @Property()
  @Unique()
  @ApiProperty()
  userName: string;

  @Property()
  @Unique()
  @IsEmail()
  @ApiProperty()
  email: string;

  @Enum({ items: () => Role })
  @ApiProperty({ description: `Role is one of [${roles.join(', ')}]` })
  role: Role = Role.VISITOR;

  @Property({ columnType: 'date', nullable: true })
  expirationDate: Date;

  @Property({ hidden: true })
  passwordHash: string;

  @Property({ default: false })
  acceptTerms = false;

  @Property({ nullable: true })
  verificationToken: string;

  @Property({ nullable: true })
  verified: Date;

  @Property({ nullable: true })
  resetToken: string;

  @Property({ nullable: true })
  resetTokenExpires: Date;

  @Property({ nullable: true })
  passwordReset: Date;

  @Property({ persist: false })
  @ApiProperty({ type: Boolean })
  get isVerified() {
    return !!(this.verified || this.passwordReset);
  }

  @OneToMany(() => RefreshToken, (rt) => rt.user, {
    hidden: true,
    cascade: [Cascade.REMOVE],
  })
  tokens = new Collection<RefreshToken>(this);

  @OneToMany(() => Location, (l) => l.user, { hidden: true, cascade: [Cascade.REMOVE] })
  locations = new Collection<Location>(this);

  @OneToMany(() => Task, (t) => t.user, { hidden: true, cascade: [Cascade.REMOVE]})
  tasks = new Collection<Task>(this);

  @OneToMany(() => Schedule, (s) => s.user, { hidden: true, cascade: [Cascade.REMOVE]})
  schedules = new Collection<Schedule>(this);

  constructor(
    firstName: string,
    lastName: string,
    userName: string,
    email: string,
    acceptTerms?: boolean,
    role?: Role,
  ) {
    super();
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = userName;
    this.email = email;
    this.acceptTerms = acceptTerms || false;
    this.role = role || Role.VISITOR;
  }
}
