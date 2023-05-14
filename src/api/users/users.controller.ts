import { Body, Controller, Delete, ForbiddenException, Get, HttpStatus, Inject, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { User } from './entities';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { Role } from './users.interface';
import { CreateUserDto, UpdateUserDto } from './dto';
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

    @Get(':id')
    @Roles()
    async findOne(@Param('id') id: string, @Req() req: AuthRequest) {
        // users can get their own account and admins can get any account
        this.checkForAdmin(id, req);

        return await this.service.findOne(id);
    }

    @Patch(':id')
    @Roles()
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Req() req: AuthRequest) {
        // users can get their own account and admins can get any account
        this.checkForAdmin(id, req);

        return await this.service.update(id, updateUserDto);
    }

    @Delete(':id')
    @Roles()
    async delete(@Param('id') id: string, @Req() req: AuthRequest) {
        // users can delete their own account and admins can delete any account
        this.checkForAdmin(id, req);

        return await this.service.remove(id);
    }

    //#region helpers

    checkForAdmin(id: string, req: AuthRequest) {
        if (id !== req.user.id && req.user.role !== Role.ADMIN) {
            throw new ForbiddenException('Not enough permissions');
        }
    }

    //#endregion
}
