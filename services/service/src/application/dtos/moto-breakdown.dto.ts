import { IsNotEmpty, IsNumber, Length } from 'class-validator';
import { Moto } from 'src/domain/entities/moto.entity';

export class CreateMotoBreakdownDto {
  @IsNumber()
  @IsNotEmpty()
  fk_moto: Moto;

  @IsNotEmpty()
  date: Date;

  @IsNotEmpty()
  @Length(1, 255)
  note: string;
}

export class UpdateMotoBreakdownDto extends CreateMotoBreakdownDto {}
