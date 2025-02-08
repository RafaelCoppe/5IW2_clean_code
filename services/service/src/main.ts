import { NestFactory } from '@nestjs/core';
import { AppModule } from './infrastructure/modules/app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);

  // Activation du CORS pour toutes les origines et avec les credentials
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  await app.listen(3001);
}

bootstrap();
