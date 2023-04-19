require('dotenv').config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createDocument } from './docs/swagger';
import { HttpExceptionFilter } from './app/core/interceptors/http.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  createDocument(app);
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(3001);
}
bootstrap();
