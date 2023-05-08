import { ApiProperty } from '@nestjs/swagger';
import {
  Equals,
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { IsStrongPassword, Match } from 'src/common/decorators';

export class RegisterRequestDto {
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

  @IsBoolean()
  @Equals(true)
  @ApiProperty({ default: true })
  acceptTerms: boolean;
}
