import { IsArray, IsNotEmpty, IsNumber, Length } from 'class-validator';
import { Moto } from 'src/domain/entities/moto.entity';
import { SparePart } from 'src/domain/entities/spare-part.entity';

export class CreateMotoServiceDto {
  @IsNumber()
  @IsNotEmpty()
  fk_moto: Moto;

  @IsNotEmpty()
  date: Date;

  @IsNotEmpty()
  @IsNumber()
  cost: number;

  @IsNotEmpty()
  @Length(1, 255)
  note: string;

  @IsArray()
  fk_parts: SparePart[];
}

export class UpdateMotoServiceDto extends CreateMotoServiceDto {}
