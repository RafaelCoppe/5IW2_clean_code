import { DataSource } from 'typeorm';
import { User } from './src/domain/entities/user.entity';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [User], // Ajoute ici toutes tes entités
  migrations: ['src/infrastructure/database/migrations/*.ts'], // Chemin vers les migrations
  synchronize: false, // Doit toujours être false en production
  logging: true,
});
