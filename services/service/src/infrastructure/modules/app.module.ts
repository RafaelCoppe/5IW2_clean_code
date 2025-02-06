import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserModule } from './user.module';
import { CompanyModule } from './company.module';
import { MotoModule } from './moto.module';
import { SparePartModule } from './spare-part.module';
import { MotoServiceModule } from './moto-service.module';
import { MotoBreakdownModule } from './moto-breakdown.module';
import { TestDriveModule } from './test-drive.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    CompanyModule,
    MotoModule,
    SparePartModule,
    MotoServiceModule,
    MotoBreakdownModule,
    TestDriveModule,
  ],
})
export class AppModule {}
