import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from 'src/domain/entities/driver.entity';
import { TestDrive } from 'src/domain/entities/test-drive.entity';
import { DriverController } from 'src/interfaces/driver.controller';
import { TestDriveController } from 'src/interfaces/test-drive.controller';
import { DriverRepository } from '../repositories/driver.repository';
import { DriverService } from 'src/application/services/driver.service';
import { TestDriveRepository } from '../repositories/test-drive.repository';
import { TestDriveService } from 'src/application/services/test-drive.service';
import { TestDriveIncident } from 'src/domain/entities/test-drive-incident.entity';
import { TestDriveIncidentRepository } from '../repositories/test-drive-incident.repository';
import { TestDriveIncidentService } from 'src/application/services/test-drive-incident.service';
import { TestDriveIncidentController } from 'src/interfaces/test-drive-incident.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Driver, TestDrive, TestDriveIncident])],
  controllers: [
    DriverController,
    TestDriveController,
    TestDriveIncidentController,
  ],
  providers: [
    DriverRepository,
    DriverService,
    TestDriveRepository,
    TestDriveService,
    TestDriveIncidentRepository,
    TestDriveIncidentService,
  ],
})
export class TestDriveModule {}
