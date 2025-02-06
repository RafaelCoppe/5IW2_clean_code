import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { SparePart } from './spare-part.entity';
import { Company } from './company.entity';

@Entity('spare_part_company')
export class SparePartCompany {
  @PrimaryColumn()
  @ManyToOne(() => SparePart, (spare_part) => spare_part.id)
  @JoinColumn({ name: 'fk_part' })
  fk_part: SparePart;

  @PrimaryColumn()
  @ManyToOne(() => Company, (company) => company.id)
  @JoinColumn({ name: 'fk_company' })
  fk_company: Company;

  @Column({ name: 'stock', type: 'integer', default: 0 })
  stock: number;
}
