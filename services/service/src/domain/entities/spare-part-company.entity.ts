import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { SparePart } from './spare-part.entity';
import { Company } from './company.entity';

@Entity('spare_part_company')
export class SparePartCompany {
  @PrimaryColumn()
  @ManyToOne(() => SparePart, (spare_part) => spare_part.id)
  @JoinColumn({ name: 'part_id' })
  part_id: SparePart;

  @PrimaryColumn()
  @ManyToOne(() => Company, (company) => company.id)
  @JoinColumn({ name: 'company_id' })
  company_id: string;

  @Column({ name: 'stock', type: 'integer', default: 0 })
  stock: number;
}
