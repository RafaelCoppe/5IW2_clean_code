import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MotoModel } from './moto-model.entity';

@Entity('moto_model_service')
export class MotoModelService {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => MotoModel, (motoModel) => motoModel.id)
  @JoinColumn({ name: 'fk_model' })
  fk_model: MotoModel;

  @Column({ name: 'distance_interval', type: 'integer', nullable: true })
  distance_interval: number; // kilometers

  @Column({ name: 'time_interval', type: 'integer', nullable: true })
  time_interval: number; // months

  @Column({ name: 'price', type: 'float' })
  price: number;

  @Column({ name: 'position', type: 'integer' })
  position: number;
}
