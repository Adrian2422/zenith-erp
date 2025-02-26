/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app/app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';

  if (process.env.APP_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Zenith ERP')
      .setDescription('The Zenith ERP API description')
      .setVersion('0.1')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
  }

  app.setGlobalPrefix(globalPrefix);
  const port = process.env.SERVER_PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Env: ${process.env.APP_ENV}`,
  );
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
  if (process.env.APP_ENV !== 'production') {
    Logger.log(
      `🚀 Swagger is running on: http://localhost:${port}/docs`,
    );
  }
}

bootstrap();
