import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateTestDriveIncidentDto,
  UpdateTestDriveIncidentDto,
} from '../dtos/test-drive-incident.dto';
import { TestDriveIncidentRepository } from 'src/infrastructure/repositories/test-drive-incident.repository';
import { TestDriveIncident } from 'src/domain/entities/test-drive-incident.entity';

@Injectable()
export class TestDriveIncidentService {
  constructor(
    private readonly testDriveIncidentRepository: TestDriveIncidentRepository,
  ) {}

  async create(
    createTestDriveIncidentDto: CreateTestDriveIncidentDto,
  ): Promise<TestDriveIncident> {
    return this.testDriveIncidentRepository.create(createTestDriveIncidentDto);
  }

  async findByTestDrive(test_drive_id: number): Promise<TestDriveIncident[]> {
    return this.testDriveIncidentRepository.findByTestDrive(test_drive_id);
  }

  async getTestDriveIncidentById(id: number): Promise<TestDriveIncident> {
    const tdi = await this.testDriveIncidentRepository.findOne(id);
    if (!tdi) {
      throw new NotFoundException(`TestDriveIncident with ID ${id} not found`);
    }
    return tdi;
  }

  async update(
    id: number,
    updateTestDriveIncidentDto: UpdateTestDriveIncidentDto,
  ): Promise<void> {
    await this.getTestDriveIncidentById(id);
    await this.testDriveIncidentRepository.update(
      id,
      updateTestDriveIncidentDto,
    );
  }

  async delete(id: number): Promise<void> {
    const tdi = await this.getTestDriveIncidentById(id);
    await this.testDriveIncidentRepository.delete(tdi);
  }
}
