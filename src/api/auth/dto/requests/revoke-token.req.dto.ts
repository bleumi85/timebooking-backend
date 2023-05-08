import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class RevokeTokenRequestDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  token: string;
}
