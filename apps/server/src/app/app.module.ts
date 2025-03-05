import { Module } from '@nestjs/common';
import { CustomPrismaModule } from 'nestjs-prisma';

import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
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
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
