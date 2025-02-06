import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDriverDto, UpdateDriverDto } from '../dtos/driver.dto';
import { DriverRepository } from 'src/infrastructure/repositories/driver.repository';
import { Driver } from 'src/domain/entities/driver.entity';

@Injectable()
export class DriverService {
  constructor(private readonly driverRepository: DriverRepository) { }

  async createUser(createUserDto: CreateDriverDto): Promise<Driver> {
    return this.driverRepository.create(createUserDto);
  }

  async getDriverById(id: string): Promise<Driver> {
    const user = await this.driverRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async updateUser(
    id: string,
    updateDriverDto: UpdateDriverDto,
  ): Promise<void> {
    await this.getDriverById(id); // Check existence
    await this.driverRepository.update(id, updateDriverDto);
  }
}
