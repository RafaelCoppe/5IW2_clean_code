import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { MotoModel } from './moto-model.entity';
import { User } from './user.entity';
import { Company } from './company.entity';
import { MotoModelService } from './moto-model-service.entity';

@Entity('moto')
export class Moto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => MotoModel, (model) => model.id)
  @JoinColumn({ name: 'fk_model' })
  fk_model: MotoModel;

  @Column({ name: 'serial_number', type: 'varchar', length: 50 })
  serial_number: string;

  @Column({ name: 'price', type: 'float' })
  price: number;

  @Column({ name: 'color', type: 'varchar', length: 50 })
  color: string;

  @Column({ name: 'capacity', type: 'integer' })
  capacity: number;

  @Column({ name: 'year', type: 'integer' })
  year: number;

  @Column({ name: 'warranty_end', type: 'date' })
  warranty_end: Date;

  @ManyToOne(() => MotoModelService, (service) => service.id, {
    nullable: true,
  })
  next_service: MotoModelService;

  @ManyToOne(() => Company, (owner) => owner.id)
  @JoinColumn({ name: 'fk_dealer' })
  fk_dealer: Company;

  @ManyToOne(() => User, (owner) => owner.id)
  @JoinColumn({ name: 'fk_owner' })
  fk_owner: User;
}
