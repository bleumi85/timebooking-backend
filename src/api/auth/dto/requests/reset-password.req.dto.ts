import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { IsStrongPassword, Match } from 'src/common/decorators';

export class ResetPasswordRequestDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  token: string;

  @IsStrongPassword()
  @ApiProperty({ default: 'Abcd1234' })
  password: string;

  @Match('password', { message: 'confirmPassword does not match password' })
  @ApiProperty({ default: 'Abcd1234' })
  confirmPassword: string;
}
