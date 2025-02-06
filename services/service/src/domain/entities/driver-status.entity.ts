import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Driver } from './driver.entity';

@Entity('driver_status')
export class DriverStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @OneToMany(() => Driver, (driver) => driver.fk_status)
  drivers: Driver[];
}
