import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as process from 'node:process';

const port = process.env.APP_PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.setGlobalPrefix('api/v1');

  if (process.env.APP_ENV !== 'production') {
    const options = new DocumentBuilder()
      .setTitle('ZenithERP')
      .setDescription('ZenithERP application')
      .setExternalDoc('API JSON', `http://localhost:${port}/api-json`)
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup('api', app, document);
  }

  app.enableCors({
    origin:
      process.env.APP_ENV !== 'production' ? ['http://localhost:4200'] : [],
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  });

  await app.listen(process.env.APP_PORT || 3000);
}

bootstrap().then(() => {
  console.info(`Environment: ${process.env.APP_ENV.toUpperCase()}`);
  console.info(`Zenith app served at http://localhost:${port}/api/v1`);
  console.info(`Api available at http://localhost:${port}/api`);
});
