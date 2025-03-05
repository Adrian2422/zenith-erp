import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  AbstractSecurityStorage,
  DefaultLocalStorageService,
  LogLevel,
  provideAuth,
  withAppInitializerAuthCheck,
} from 'angular-auth-oidc-client';

import { environment } from '../environments/environment';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAuth(
      {
        config: {
          authority: environment.authority,
          redirectUrl: window.location.origin,
          postLogoutRedirectUri: window.location.origin,
          clientId: environment.clientId,
          scope: 'openid profile email offline_access',
          authWellknownEndpointUrl: environment.wellknownEndpointUrl,
          responseType: 'code',
          silentRenew: true,
          useRefreshToken: true,
          startCheckSession: true,
          logLevel: LogLevel.Warn,
        },
      },
      withAppInitializerAuthCheck(),
    ),
    {
      provide: AbstractSecurityStorage,
      useClass: DefaultLocalStorageService,
    },
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
  ],
};
