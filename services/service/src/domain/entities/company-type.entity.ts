import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('company_type')
export class CompanyType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;
}
