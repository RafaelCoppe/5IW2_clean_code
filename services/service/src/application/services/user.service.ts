import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../../infrastructure/repositories/user.repository';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.create(createUserDto);
  }

  async getUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<void> {
    await this.getUserById(id); // Check existence
    await this.userRepository.update(id, updateUserDto);
  }

  async deleteUser(id: string): Promise<void> {
    await this.getUserById(id); // Check existence
    await this.userRepository.delete(id);
  }
}
