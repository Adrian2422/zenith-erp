import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CustomPrismaModule } from 'nestjs-prisma';

import { AuthModule } from '../auth/auth.module';
import { HttpLoggerInterceptor } from '../common/interceptors/http-logger/http-logger.interceptor';
import { EmployeesModule } from '../employees/employees.module';
import { KeycloakEventsModule } from '../keycloak-events/keycloak-events.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { extendedPrismaClient } from './prisma.extension';

@Module({
  imports: [
    CustomPrismaModule.forRootAsync({
      isGlobal: true,
      name: 'PrismaService',
      useFactory: () => {
        return extendedPrismaClient;
      },
    }),
    AuthModule,
    EmployeesModule,
    KeycloakEventsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpLoggerInterceptor,
    },
  ],
})
export class AppModule {}
