import {
  Entity,
  EntityRepositoryType,
  ManyToOne,
  Property,
} from '@mikro-orm/core';
import { AbstractEntity } from '../../../common/entities';
import { RefreshTokenRepository } from '../refresh-tokens.repository';
import { User } from '../../users/entities';

@Entity({
  tableName: 'refresh_tokens',
  customRepository: () => RefreshTokenRepository,
})
export class RefreshToken extends AbstractEntity {
  [EntityRepositoryType]?: RefreshTokenRepository;

  @ManyToOne(() => User)
  user: User;

  @Property()
  token: string;

  @Property()
  expires: Date;

  @Property({ nullable: true })
  created: Date;

  @Property({ nullable: true })
  createdByIp: string;

  @Property({ nullable: true })
  revoked: Date;

  @Property({ nullable: true })
  revokedByIp: string;

  @Property({ nullable: true })
  replacedByToken: string;

  @Property({ nullable: true })
  reasonRevoked: string;

  @Property({ persist: false })
  get isExpired(): boolean {
    return new Date() >= this.expires;
  }

  @Property({ persist: false })
  get isActive(): boolean {
    return !this.revoked && !this.isExpired;
  }
}
