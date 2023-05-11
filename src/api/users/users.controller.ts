import { Body, Controller, Get, HttpStatus, Inject, Post, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { User } from './entities';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { Role } from './users.interface';
import { CreateUserDto } from './dto';
import { Roles } from './roles.decorator';
import { RoleGuard } from './role.guard';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';

interface AuthRequest extends Request {
    user: User
}

const name = 'users'

@Controller(name)
@ApiTags(name)
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RoleGuard)
export class UsersController {
    @Inject(UsersService)
    private readonly service: UsersService;

    @Post()
    @Roles(Role.ADMIN)
    @ApiResponse({ status: HttpStatus.OK, description: 'All right' })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Only Admins are allowed to see this content' })
    @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Unhandled error' })
    async create(@Body() createUserDto: CreateUserDto) {
        return this.service.create(createUserDto);
    }

    @Get()
    @Roles(Role.ADMIN)
    @ApiResponse({ status: HttpStatus.OK, description: 'All users', type: User, isArray: true })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Only Admins are allowed to see this content' })
    @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Unhandled error' })
    async findAll() {
        return await this.service.findAll();
    }
}
