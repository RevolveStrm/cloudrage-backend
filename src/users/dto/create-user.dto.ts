import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    default: 'user@gmail.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    default: 'user_password',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    default: 'John Doe',
  })
  fullName: string;
}
