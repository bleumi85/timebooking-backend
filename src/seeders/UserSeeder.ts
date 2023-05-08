import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import * as bcrypt from 'bcrypt';
import { User } from 'src/api/users/entities';
import { UsersFactory } from 'src/api/users/users.factory';
import { Role } from 'src/api/users/users.interface';

export class UserSeeder extends Seeder {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  async run(em: EntityManager): Promise<void> {
    const admin = em.upsert(User, {
      firstName: 'Admin',
      lastName: 'Api',
      userName: 'admin',
      email: 'admin@timebooking.com',
      role: Role.ADMIN,
      passwordHash: await bcrypt.hash('Abcd!1234', 10),
      verified: new Date(Date.UTC(2000, 0, 1)),
      acceptTerms: true,
    });

    let n =
      process.env.SEED_VISITORS === undefined ? 10 : +process.env.SEED_VISITORS;
    const [_, count] = await em.findAndCount(User, { role: Role.VISITOR });
    n = n - Math.min(count, n);
    const users = await new UsersFactory(em).create(n, {
      verified: new Date(Date.UTC(2000, 0, 1)),
      acceptTerms: true,
    });
    /* eslint-enable @typescript-eslint/no-unused-vars */
  }
}
