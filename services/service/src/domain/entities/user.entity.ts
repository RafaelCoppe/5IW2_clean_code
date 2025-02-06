import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Company } from './company.entity';
import { Moto } from './moto.entity';
import { Driver } from './driver.entity';

@Entity('app_user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'first_name', type: 'varchar', length: 50 })
  first_name: string;

  @Column({ name: 'last_name', type: 'varchar', length: 50 })
  last_name: string;

  @Column({ name: 'email', type: 'varchar', length: 100 })
  email: string;

  @Column({ name: 'phone', type: 'varchar', length: 15 })
  phone: string;

  @Column({ name: 'password', type: 'varchar', length: 100 })
  password: string;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @ManyToOne(() => Company, (company) => company.users)
  @JoinColumn({ name: 'fk_company' })
  fk_company: Company;

  @Column({ name: 'is_admin', type: 'boolean', default: false })
  is_admin: boolean;

  @OneToMany(() => Moto, (moto) => moto.fk_owner)
  motos: Moto[];

  @OneToOne(() => Driver, (driver) => driver.fk_user)
  driver: Driver;
}
