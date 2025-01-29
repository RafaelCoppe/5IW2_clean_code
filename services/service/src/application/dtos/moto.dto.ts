import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';
import { MotoModel } from 'src/domain/entities/moto-model.entity';

export class CreateMotoDto {
  @IsNumber()
  @IsNotEmpty()
  fk_model: MotoModel;

  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  serial_number: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  color: string;

  @IsNumber()
  @IsNotEmpty()
  capacity: number;

  @IsNumber()
  @IsNotEmpty()
  year: number;

  @IsDate()
  @IsNotEmpty()
  warranty_end: Date;

  @IsDate()
  @IsNotEmpty()
  next_service_date: Date;

  @IsNumber()
  @IsNotEmpty()
  next_service_distance: number;
}

export class UpdateMotoDto extends CreateMotoDto {}
