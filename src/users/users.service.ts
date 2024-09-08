import * as bcrypt from 'bcrypt';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.repository.findOneBy({
      email,
    });
  }

  async findById(id: number): Promise<Partial<User> | null> {
    return this.repository.findOne({
      where: { id },
      select: ['id', 'email', 'fullName'],
    });
  }

  async create(dto: CreateUserDto) {
    try {
      const existingUser = await this.findByEmail(dto.email);

      if (existingUser) {
        throw new ConflictException('User with this email already exists');
      }

      if (!dto.email || !dto.password || !dto.fullName) {
        throw new ConflictException('Missing required fields');
      }

      const hashedPassword = await bcrypt.hash(dto.password, 10);

      return this.repository.save({
        ...dto,
        password: hashedPassword,
      });
    } catch (error) {
      console.error('Error creating user:', error);
      throw new InternalServerErrorException('Failed to create user');
    }
  }
}
