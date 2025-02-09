import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { MotoModelCategory } from './moto-model-category.entity';
import { Moto } from './moto.entity';
import { MotoModelService } from './moto-model-service.entity';

@Entity('moto_model')
export class MotoModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'label', type: 'varchar', length: 100 })
  label: string;

  @OneToMany(() => Moto, (moto) => moto.fk_model)
  motos: Moto[];

  @ManyToOne(() => MotoModelCategory, (category) => category.id)
  @JoinColumn({ name: 'fk_category' })
  fk_category: MotoModelCategory;

  @OneToMany(() => MotoModelService, (service) => service.fk_model)
  services: MotoModelService[];
}
