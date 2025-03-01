import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  AbstractSecurityStorage,
  AuthModule,
  DefaultLocalStorageService,
  LogLevel,
  provideAuth,
  withAppInitializerAuthCheck,
} from 'angular-auth-oidc-client';

import { environment } from '../environments/environment';
import { appRoutes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

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
          responseType: 'code',
          silentRenew: true,
          useRefreshToken: true,
          logLevel: LogLevel.Debug,
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
