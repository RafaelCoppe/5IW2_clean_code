import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserModule } from './user.module';
import { CompanyModule } from './company.module';
import { CompanyTypeModule } from './company-type.module';
import { MotoModule } from './moto.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    CompanyModule,
    CompanyTypeModule,
    MotoModule,
  ],
})
export class AppModule {}
