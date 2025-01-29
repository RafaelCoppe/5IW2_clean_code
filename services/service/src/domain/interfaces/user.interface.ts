import { Company } from '../entities/company.entity';

export interface IUser {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
  fk_company: Company;
  is_admin: boolean;
}
