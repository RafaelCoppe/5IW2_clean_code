import { IsNotEmpty, IsNumber, Length } from 'class-validator';
import { Moto } from 'src/domain/entities/moto.entity';

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
}

export class UpdateMotoServiceDto extends CreateMotoServiceDto {}
