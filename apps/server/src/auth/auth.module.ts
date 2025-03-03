import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';

import { KeycloakAuthGuard } from './guards/auth.guard';
import { KeycloakStrategy } from './keycloak.strategy';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [
    KeycloakStrategy,
    {
      provide: APP_GUARD,
      useClass: KeycloakAuthGuard,
    },
  ],
  exports: [PassportModule]
})
export class AuthModule {}
