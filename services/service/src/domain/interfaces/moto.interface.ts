import { MotoModel } from '../entities/moto-model.entity';

export interface IMoto {
  id: string;
  fk_model: MotoModel;
  serial_number: string;
  price: number;
  color: string;
  capacity: number;
  year: number;
  warranty_end: Date;
  next_service_date: Date;
  next_service_distance: number;
}
