/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { HttpStatus, Logger, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';

import { AppModule } from './app/app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(
    new PrismaClientExceptionFilter(httpAdapter, {
      P2000: HttpStatus.BAD_REQUEST,
      P2002: HttpStatus.CONFLICT,
      P2025: HttpStatus.NOT_FOUND,
    }),
  );
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.setGlobalPrefix(globalPrefix);

  if (process.env.APP_ENV !== 'production') {
    const config = new DocumentBuilder()
      .addOAuth2({
        type: 'oauth2',
        description: 'Keycloak',
        bearerFormat: 'JWT',
        in: 'Header',
        name: 'Authorization',
        flows: {
          password: {
            tokenUrl: 'http://localhost:8080/realms/zenith-realm/protocol/openid-connect/token',
            authorizationUrl: 'http://localhost:8080/realms/zenith-realm/protocol/openid-connect/auth',
            scopes: {
              email: 'Email',
              roles: 'Roles',
              profile: 'Profile',
              openid: 'User id',
            },
          }
        }
      })
      .setTitle('Zenith ERP')
      .setDescription('The Zenith ERP API description')
      .setVersion('0.1')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document, {
      swaggerOptions: {
        persistAuthorization: true,
        initOAuth: {
          clientId: 'zenith-client',
          realm: 'zenith-realm',
        }
      },
      jsonDocumentUrl: 'swagger/json',
    });
  }

  const port = process.env.SERVER_PORT || 3000;
  await app.listen(port);
  Logger.log(`🚀 Env: ${process.env.APP_ENV}`);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
  if (process.env.APP_ENV !== 'production') {
    Logger.log(`🚀 Swagger is running on: http://localhost:${port}/docs`);
  }
}

bootstrap();
