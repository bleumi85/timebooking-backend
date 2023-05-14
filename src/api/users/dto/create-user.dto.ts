import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsOptional, IsIn } from 'class-validator';
import { IsStrongPassword, Match } from 'src/common/decorators';
import { Role } from '../users.interface';

const roles = Object.values(Role);

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ default: 'Ansgar' })
    firstName: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ default: 'Ragentor' })
    lastName: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ default: 'crazy.ansgar' })
    userName: string;

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({ default: 'crazy.ansgar@gmail.com' })
    email: string;

    @IsStrongPassword()
    @ApiProperty({ default: 'Abcd1234' })
    password: string;

    @Match('password', { message: 'confirmPassword does not match password' })
    @ApiProperty({ default: 'Abcd1234' })
    confirmPassword: string;

    @IsString()
    @IsIn(roles, { message: 'Role must be one of ' + roles.join(', ') })
    @ApiProperty({ default: Role.USER })
    role: Role;
}
