import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';
import { Company } from 'src/domain/entities/company.entity';
import { MotoModel } from 'src/domain/entities/moto-model.entity';
import { User } from 'src/domain/entities/user.entity';

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

  @IsNotEmpty()
  fk_dealer: Company;

  fk_owner?: User;
}

export class UpdateMotoDto extends CreateMotoDto {}
