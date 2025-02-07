import {
  Entity,
  ManyToOne,
  JoinColumn,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { Moto } from './moto.entity';
import { TestDriveIncident } from './test-drive-incident.entity';

@Entity('test_drive')
export class TestDrive {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'fk_driver' })
  fk_driver: User;

  @ManyToOne(() => Moto, (moto) => moto.id)
  @JoinColumn({ name: 'fk_moto' })
  fk_moto: Moto;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'integer' }) // minutes
  duration: number;

  @OneToMany(() => TestDriveIncident, (incident) => incident.fk_test_drive)
  @JoinColumn({ name: 'fk_incident' })
  fk_incident: TestDriveIncident[];
}
