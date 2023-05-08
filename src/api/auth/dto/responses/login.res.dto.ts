import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/api/users/entities';

export class LoginResponseDto {
  @ApiProperty({ type: User })
  user: User;

  @ApiProperty()
  jwtToken: string;
}
