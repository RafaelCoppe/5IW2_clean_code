import { Entity, JoinColumn, OneToOne } from 'typeorm';
import { Company } from './company.entity';
import { Moto } from './moto.entity';

@Entity('user')
export class User {
  @OneToOne(() => Moto)
  @JoinColumn({ name: 'fk_moto' })
  fk_moto: Moto;

  @OneToOne(() => Company)
  @JoinColumn({ name: 'fk_dealer' })
  fk_dealer: Company;

  @OneToOne(() => User)
  @JoinColumn({ name: 'fk_owner' })
  fk_owner: User;
}
