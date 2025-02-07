import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { MotoModel } from './moto-model.entity';

@Entity('moto_model_category')
export class MotoModelCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'label', type: 'varchar', length: 100 })
  label: string;

  @OneToMany(() => MotoModel, (model) => model.fk_category)
  models: MotoModel[];
}
