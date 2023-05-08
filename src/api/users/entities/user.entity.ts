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

@Entity({ tableName: 'users', customRepository: () => UserRepository })
@Unique({
  properties: ['firstName', 'lastName'],
  name: 'users_full_name_unique',
})
export class User extends AbstractEntity {
  [EntityRepositoryType]?: UserRepository;

  @Property()
  firstName: string;

  @Property()
  lastName: string;

  @Property()
  @Unique()
  userName: string;

  @Property()
  @Unique()
  @IsEmail()
  email: string;

  @Enum({ items: () => Role })
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
  get isVerified() {
    return !!(this.verified || this.passwordReset);
  }

  @OneToMany(() => RefreshToken, (rt) => rt.user, {
    hidden: true,
    cascade: [Cascade.REMOVE],
  })
  tokens = new Collection<RefreshToken>(this);
}
