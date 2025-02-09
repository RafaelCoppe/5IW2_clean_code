import { IsString, IsNotEmpty, Length, IsBoolean } from 'class-validator';
import { Company } from 'src/domain/entities/company.entity';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  first_name: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  last_name: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(10, 15)
  phone: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 100)
  password: string;

  @IsNotEmpty()
  fk_company: Company;

  @IsBoolean()
  @IsNotEmpty()
  is_admin: boolean;
}

export class UpdateUserDto extends CreateUserDto {}
