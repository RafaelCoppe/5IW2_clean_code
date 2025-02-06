import {
  Entity,
  ManyToOne,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  Column,
} from 'typeorm';
import { User } from './user.entity';
import { DriverStatus } from './driver-status.entity';

@Entity('driver')
export class Driver {
  @PrimaryColumn()
  @OneToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'fk_user' })
  fk_user: string;

  @ManyToOne(() => DriverStatus, (driverStatus) => driverStatus.id)
  @JoinColumn({ name: 'fk_status' })
  fk_status: number;

  @Column({ name: 'license_link', type: 'varchar' })
  license_link: string;

  @Column({ name: 'experience', type: 'varchar' })
  experience: string;
}
