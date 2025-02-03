import { IsNotEmpty, IsNumber } from 'class-validator';
import { Company } from 'src/domain/entities/company.entity';
import { SparePart } from 'src/domain/entities/spare-part.entity';

export class CreateSparePartCommandDto {
  @IsNumber()
  @IsNotEmpty()
  fk_spare_part: SparePart;

  @IsNotEmpty()
  fk_company: Company;

  @IsNumber()
  @IsNotEmpty()
  remaining_quantity: number;

  @IsNumber()
  @IsNotEmpty()
  ordered_quantity: number;

  @IsNumber()
  @IsNotEmpty()
  total_price: number;

  @IsNotEmpty()
  date_order: Date;
}

export class UpdateSparePartCommandDto {
  @IsNotEmpty()
  date_received: Date;
}
