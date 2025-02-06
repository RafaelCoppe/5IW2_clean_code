import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { TestDrive } from './test-drive.entity';

@Entity('test_drive_incident')
export class TestDriveIncident {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  incident: string;

  @ManyToOne(() => TestDrive, (testDrive) => testDrive.fk_incident)
  @JoinColumn({ name: 'fk_test_drive' })
  fk_test_drive: TestDrive;
}
