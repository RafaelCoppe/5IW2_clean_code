import { Company } from '../entities/company.entity';

export interface IUser {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
  company_id: Company;
  is_admin: boolean;
}
