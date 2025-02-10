import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TestDrive } from 'src/domain/entities/test-drive.entity';

@Injectable()
export class TestDriveRepository {
  constructor(
    @InjectRepository(TestDrive)
    private readonly repository: Repository<TestDrive>,
  ) {}

  async findOne(id: number): Promise<TestDrive> {
    return this.repository.findOne({
      where: { id },
      relations: {
        fk_driver: true,
        fk_moto: true,
        fk_incident: true,
      },
    });
  }

  async findByDriver(driver_id: string): Promise<TestDrive[]> {
    return this.repository.find({
      where: {
        fk_driver: {
          id: driver_id,
        },
      },
      relations: {
        fk_moto: true,
        fk_incident: true,
      },
    });
  }

  async findByMoto(moto_id: string): Promise<TestDrive[]> {
    return this.repository.find({
      where: {
        fk_moto: {
          id: moto_id,
        },
      },
      relations: {
        fk_driver: true,
        fk_moto: true,
        fk_incident: true,
      },
    });
  }

  async findByCompany(company_id: string): Promise<TestDrive[]> {
    return this.repository.find({
      where: {
        fk_moto: {
          fk_dealer: {
            id: company_id,
          },
        },
      },
      relations: {
        fk_driver: true,
        fk_moto: true,
        fk_incident: true,
      },
    });
  }

  async create(driver: Partial<TestDrive>): Promise<TestDrive> {
    return this.repository.save(driver);
  }

  async update(id: number, driver: Partial<TestDrive>): Promise<void> {
    await this.repository.update(id, driver);
  }

  async findAll(): Promise<TestDrive[]> {
    return this.repository.find({
      relations: {
        fk_driver: true,
        fk_moto: true,
        fk_incident: true,
      },
    });
  }
}
