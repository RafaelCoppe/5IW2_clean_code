import { CompanyType } from '../entities/company-type.entity';

export interface ICompany {
  id: string;
  name: string;
  fk_type: CompanyType;
  address: string;
  number: string;
  city: string;
  citycode: string;
  contact_first_name: string;
  contact_last_name: string;
  contact_mail: string;
  contact_phone: string;
}
