import { Factory, Faker } from '@mikro-orm/seeder';
import { User } from './entities';
import * as bcrypt from 'bcrypt';

export class UsersFactory extends Factory<User> {
  model = User;

  definition(faker: Faker): Partial<User> {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const userName = `${firstName.toLocaleLowerCase()}.${lastName.toLocaleLowerCase()}`;
    const email = `${userName}@gmail.com`;

    return {
      firstName,
      lastName,
      userName,
      email,
      passwordHash: bcrypt.hashSync('Abcd1234', 10),
    };
  }
}
