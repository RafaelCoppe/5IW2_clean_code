import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserModule } from './user.module';
import { CompanyModule } from './company.module';
import { MotoModule } from './moto.module';
import { SparePartModule } from './spare-part.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    CompanyModule,
    MotoModule,
    SparePartModule,
  ],
})
export class AppModule {}
