import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../domain/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.repository.findOne({
      where: {
        email,
      },
      relations: {
        fk_company: {
          fk_type: true,
        },
      },
    });
  }

  async create(user: Partial<User>): Promise<User> {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    return this.repository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.repository.find({
      relations: {
        fk_company: {
          fk_type: true,
        },
        motos: true,
        driver: true,
      },
    });
  }

  async findOne(id: string): Promise<User | null> {
    return this.repository.findOne({
      where: { id },
      relations: {
        fk_company: {
          fk_type: true,
        },
        motos: true,
        driver: true,
      },
    });
  }

  async update(id: string, user: Partial<User>): Promise<void> {
    if (user.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }

    await this.repository.update(id, user);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
