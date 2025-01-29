import { MotoModelCategory } from '../entities/moto-model-category.entity';

export interface IMoto {
  label: string;
  fk_category: MotoModelCategory;
}
