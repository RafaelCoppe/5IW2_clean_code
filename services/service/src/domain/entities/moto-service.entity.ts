import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Moto } from './moto.entity';
import { SparePart } from './spare-part.entity';

@Entity('moto_service')
export class MotoService {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Moto, (moto) => moto.id)
  @JoinColumn({ name: 'fk_moto' })
  fk_moto: Moto;

  @Column({ name: 'date', type: 'date' })
  date: Date;

  @Column({ name: 'cost', type: 'float' })
  cost: number;

  @Column({ name: 'note', type: 'varchar', length: 255 })
  note: string;

  @ManyToMany(() => SparePart, (sparePart) => sparePart.id, { cascade: true })
  @JoinTable({
    name: 'moto_service_spare_part',
    joinColumn: { name: 'fk_moto_service', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'fk_spare_part', referencedColumnName: 'id' },
  })
  fk_parts: SparePart[];
}
