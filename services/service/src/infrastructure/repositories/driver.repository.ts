import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Driver } from '../../domain/entities/driver.entity';

@Injectable()
export class DriverRepository {
  constructor(
    @InjectRepository(Driver)
    private readonly repository: Repository<Driver>,
  ) {}

  async findOne(id: string): Promise<Driver> {
    return this.repository.findOne({
      where: { fk_user: id },
    });
  }

  async activate(id: string): Promise<void> {
    await this.repository.update(id, {
      fk_status: {
        id: 1,
      },
    });
  }

  async create(driver: Partial<Driver>): Promise<Driver> {
    return this.repository.save(driver);
  }

  async update(id: string, driver: Partial<Driver>): Promise<void> {
    await this.repository.update(id, driver);
  }
}
