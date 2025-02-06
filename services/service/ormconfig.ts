import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [__dirname + 'src/domain/entities/*.entity.ts'], // Ajoute ici toutes tes entités
  synchronize: false, // Doit toujours être false en production
  logging: true,
});
