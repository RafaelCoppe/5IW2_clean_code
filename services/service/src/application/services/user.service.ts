import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../../infrastructure/repositories/user.repository';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { User } from '../../domain/entities/user.entity';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async validatePassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean | void> {
    bcrypt.compare(plainPassword, hashedPassword, function (err, result) {
      if (err) {
        throw new NotFoundException('Invalid password');
      }
      return result;
    });
  }

  generateToken(user: User): string {
    const payload = {
      email: user.email,
      password: user.password,
      fk_type: user.fk_company?.fk_type || null,
    };

    return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: '7 days',
    });
  }

  async login(email: string, password: string): Promise<User> {
    if (!email || !password) {
      throw new NotFoundException('Email and password are required');
    }

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    await this.validatePassword(password, user.password);

    // Générer un token
    const token = this.generateToken(user);
    user.token = token;

    // Ajouter le token à l'objet user
    return user;
  }

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
