import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../domain/entities/user.entity';
import { UserRepository } from '../repositories/user.repository';
import { UserService } from '../../application/services/user.service';
import { UserController } from '../../interfaces/user.controller';
import { Driver } from 'src/domain/entities/driver.entity';
import { DriverController } from 'src/interfaces/driver.controller';
import { DriverRepository } from '../repositories/driver.repository';
import { DriverService } from 'src/application/services/driver.service';
import { DriverStatus } from 'src/domain/entities/driver-status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Driver, DriverStatus])],
  controllers: [UserController, DriverController],
  providers: [UserRepository, UserService, DriverRepository, DriverService],
})
export class UserModule {}
