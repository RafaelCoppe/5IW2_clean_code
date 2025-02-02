import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { Company } from 'src/domain/entities/company.entity';
import { SparePart } from 'src/domain/entities/spare-part.entity';

export class CreateSparePartCompanyDto {
  @IsNumber()
  @IsNotEmpty()
  part_id: SparePart;

  @IsString()
  @IsNotEmpty()
  company_id: Company;

  @IsNumber()
  @IsNotEmpty()
  stock?: number;
}

export class UpdateSparePartDto {
  @IsNumber()
  @IsNotEmpty()
  stock: number;
}
