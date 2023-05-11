import { EntityManager } from '@mikro-orm/core';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersHelper } from './users.helper';
import { UserRepository } from './users.repository';
import { CreateUserDto } from './dto';
import { User } from './entities';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly usersHelper: UsersHelper,
        private readonly em: EntityManager,
    ) { }

    async create(body: CreateUserDto) {
        const { firstName, lastName, userName, email, password, role } = body;

        // check uniqueness of userName/email
        const exists = await this.userRepository.count({ $or: [{ email }, { userName }] });

        if (exists > 0) {
            throw new BadRequestException(`Email '${email}' or UserName '${userName}' is already registered`);
        }

        const user: User = new User(firstName, lastName, userName, email, true, role);
        user.verified = new Date();

        // hash password
        user.passwordHash = await bcrypt.hash(password, 10);

        // save user
        await this.em.persistAndFlush(user);
    }

    async findAll() {
        const users = await this.userRepository.findAll();
        return users.map(user => this.usersHelper.buildUserRO(user).user);
    }
}
