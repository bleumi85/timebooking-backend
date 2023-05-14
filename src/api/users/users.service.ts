import { EntityManager } from '@mikro-orm/core';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersHelper } from './users.helper';
import { UserRepository } from './users.repository';
import { CreateUserDto, UpdateUserDto } from './dto';
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

    async findOne(id: string) {
        const user = await this.usersHelper.getUser(id);
        return this.usersHelper.buildUserRO(user);
    }

    async update(id: string, params: UpdateUserDto) {
        const user = await this.usersHelper.getUser(id);

        // validate (if email was changed)
        if (params.email && user.email !== params.email && await this.userRepository.findOne({ email: params.email })) {
            throw new BadRequestException('Email "' + params.email + '" is already taken');
        }

        return { message: `This action updated a #${id} user`}
    }

    async remove(id: string) {
        const user = await this.usersHelper.getUser(id);
        await this.em.removeAndFlush(user);
    }
}
