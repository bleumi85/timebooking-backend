import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginRequestDto {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({ default: 'user@timebooking.com' })
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ default: 'Abcd!1234'})
    password: string;
}
