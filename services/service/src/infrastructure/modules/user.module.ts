import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../domain/entities/user.entity';
import { UserRepository } from '../repositories/user.repository';
import { UserService } from '../../application/services/user.service';
import { UserController } from '../../interfaces/http/controllers/user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserRepository, UserService],
})
export class UserModule {}
