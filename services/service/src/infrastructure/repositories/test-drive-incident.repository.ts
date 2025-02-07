import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TestDriveIncident } from 'src/domain/entities/test-drive-incident.entity';

@Injectable()
export class TestDriveIncidentRepository {
  constructor(
    @InjectRepository(TestDriveIncident)
    private readonly repository: Repository<TestDriveIncident>,
  ) {}

  async create(driver: Partial<TestDriveIncident>): Promise<TestDriveIncident> {
    return this.repository.save(driver);
  }

  async findOne(id: number): Promise<TestDriveIncident> {
    return this.repository.findOne({ where: { id } });
  }

  async findByTestDrive(test_drive_id: number): Promise<TestDriveIncident[]> {
    return this.repository.find({
      where: {
        fk_test_drive: {
          id: test_drive_id,
        },
      },
    });
  }

  async update(id: number, driver: Partial<TestDriveIncident>): Promise<void> {
    await this.repository.update(id, driver);
  }

  async delete(driver: TestDriveIncident): Promise<void> {
    await this.repository.remove(driver);
  }
}
