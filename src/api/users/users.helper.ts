import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersHelper {
  constructor(
    private readonly userRepository: UserRepository,
  ) { }

  buildUserRO(user: User) {
    const userRO = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      userName: user.userName,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified,
    };

    return {
      user: userRO,
    };
  }

  async getUser(id: string): Promise<User | never> {
    const user = await this.userRepository.findOne({ id });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
}
