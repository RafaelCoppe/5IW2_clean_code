import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { CompanyType } from './company-type.entity';
import { User } from './user.entity';

@Entity('company')
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => CompanyType, (type) => type.companies)
  type_id: CompanyType;

  @Column({ name: 'address', type: 'varchar', length: 100 })
  address: string;

  @Column({ name: 'number', type: 'varchar', length: 50 })
  number: string;

  @Column({ name: 'city', type: 'varchar', length: 100 })
  city: string;

  @Column({ name: 'citycode', type: 'varchar', length: 50 })
  citycode: string;

  @Column({ name: 'mail', type: 'varchar', length: 100 })
  mail: string;

  @Column({ name: 'phone', type: 'varchar', length: 50 })
  phone: string;

  @Column({ name: 'contact_first_name', type: 'varchar', length: 50 })
  contact_first_name: string;

  @Column({ name: 'contact_last_name', type: 'varchar', length: 50 })
  contact_last_name: string;

  @Column({ name: 'contact_mail', type: 'varchar', length: 100 })
  contact_mail: string;

  @Column({ name: 'contact_phone', type: 'varchar', length: 50 })
  contact_phone: string;

  @OneToMany(() => User, (user) => user.company_id)
  users: User[];
}
