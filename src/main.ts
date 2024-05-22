import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // Load environment variables
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  // app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000);
}
bootstrap();
