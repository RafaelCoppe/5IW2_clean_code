import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Moto } from './moto.entity';

@Entity('moto_breakdown')
export class MotoBreakdown {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Moto, (moto) => moto.id)
  @JoinColumn({ name: 'fk_moto' })
  fk_moto: Moto;

  @Column({ name: 'date', type: 'date' })
  date: Date;

  @Column({ name: 'note', type: 'varchar', length: 255 })
  note: string;
}
