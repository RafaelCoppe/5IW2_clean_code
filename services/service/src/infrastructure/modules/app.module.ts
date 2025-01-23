import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserModule } from './user.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [DatabaseModule, UserModule, TypeOrmModule.forRoot()],
})
export class AppModule {}
