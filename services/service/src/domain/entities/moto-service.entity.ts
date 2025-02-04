import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Moto } from './moto.entity';

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
}
