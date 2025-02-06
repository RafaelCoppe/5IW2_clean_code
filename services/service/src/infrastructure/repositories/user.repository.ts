import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async create(user: Partial<User>): Promise<User> {
    return this.repository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.repository.find({
      relations: {
        fk_company: true,
        motos: true,
        driver: true,
      },
    });
  }

  async findOne(id: string): Promise<User | null> {
    return this.repository.findOne({
      where: { id },
      relations: { fk_company: true, motos: true, driver: true },
    });
  }

  async update(id: string, user: Partial<User>): Promise<void> {
    await this.repository.update(id, user);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
