import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SparePart } from './spare-part.entity';
import { Company } from './company.entity';

@Entity('spare_part_command')
export class SparePartCommand {
  @PrimaryGeneratedColumn()
  id: number;

  @JoinColumn({ name: 'fk_spare_part' })
  @ManyToOne(() => SparePart, (spare_part) => spare_part.id)
  fk_spare_part: SparePart;

  @JoinColumn({ name: 'fk_company' })
  @ManyToOne(() => Company, (company) => company.id)
  fk_company: Company;

  @Column({ name: 'remaining_quantity', type: 'integer', default: 0 })
  remaining_quantity: number;

  @Column({ name: 'ordered_quantity', type: 'integer', default: 0 })
  ordered_quantity: number;

  @Column({ name: 'total_price', type: 'decimal', precision: 10, scale: 2 })
  total_price: number;

  @Column({ name: 'date_order', type: 'date' })
  date_order: Date;

  @Column({ name: 'date_received', type: 'date' })
  date_received: Date;
}
