import { IsNotEmpty, IsNumber } from 'class-validator';
import { TestDrive } from 'src/domain/entities/test-drive.entity';

export class CreateTestDriveIncidentDto {
  @IsNotEmpty()
  @IsNumber()
  incident: string;

  @IsNotEmpty()
  @IsNumber()
  fk_test_drive: TestDrive;
}

export class UpdateTestDriveIncidentDto extends CreateTestDriveIncidentDto {}
