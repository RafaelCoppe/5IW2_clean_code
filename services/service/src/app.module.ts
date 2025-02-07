import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/infrastructure/database/database.module';
import { UserModule } from 'src/infrastructure/modules/user.module';

@Module({
  imports: [DatabaseModule, UserModule, TypeOrmModule.forRoot()],
})
export class AppModule {}
