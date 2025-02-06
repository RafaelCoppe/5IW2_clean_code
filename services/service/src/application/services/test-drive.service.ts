import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTestDriveDto, UpdateTestDriveDto } from '../dtos/test-drive.dto';
import { TestDriveRepository } from 'src/infrastructure/repositories/test-drive.repository';
import { TestDrive } from 'src/domain/entities/test-drive.entity';

@Injectable()
export class TestDriveService {
  constructor(private readonly testDriveRepository: TestDriveRepository) {}

  async create(createMotoDto: CreateTestDriveDto): Promise<TestDrive> {
    return this.testDriveRepository.create(createMotoDto);
  }

  async findByDriver(driver_id: string): Promise<TestDrive[]> {
    return this.testDriveRepository.findByDriver(driver_id);
  }

  async findByMoto(moto_id: string): Promise<TestDrive[]> {
    return this.testDriveRepository.findByMoto(moto_id);
  }

  async getTestDriveById(id: number): Promise<TestDrive> {
    const moto = await this.testDriveRepository.findOne(id);
    if (!moto) {
      throw new NotFoundException(`TestDrive with ID ${id} not found`);
    }
    return moto;
  }

  async update(
    id: number,
    updateTestDriveDto: UpdateTestDriveDto,
  ): Promise<void> {
    await this.getTestDriveById(id); // Check existence
    await this.testDriveRepository.update(id, updateTestDriveDto);
  }
}
