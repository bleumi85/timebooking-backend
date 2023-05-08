import { Injectable } from '@nestjs/common';
import { User } from './entities';

@Injectable()
export class UsersHelper {
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
}
