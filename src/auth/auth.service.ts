import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<Omit<User, 'password'> | null> {
    console.log(email, password);
    const user: User | null = await this.usersService.findByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;

      return result;
    }

    return null;
  }

  async register(dto: CreateUserDto) {
    try {
      const user: User | null = await this.usersService.create(dto);

      if (!user) {
        throw 'User has not been created.';
      }

      return {
        token: this.jwtService.sign({ id: user.id }),
      };
    } catch (error) {
      console.error(error);
      throw new BadRequestException(
        'User registration failed. Please check your input and try again.',
      );
    }
  }

  async login(user: User) {
    return {
      token: this.jwtService.sign({ id: user.id }),
    };
  }
}
