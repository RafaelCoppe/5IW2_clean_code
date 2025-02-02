import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('spare_part')
export class SparePart {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'label', type: 'varchar', length: 100 })
  label: string;

  @Column({ name: 'picture_link', type: 'varchar' })
  picture_link: string;
}
