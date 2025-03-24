import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import {
  AbstractSecurityStorage,
  DefaultLocalStorageService,
  LogLevel,
  provideAuth,
  withAppInitializerAuthCheck,
} from 'angular-auth-oidc-client';
import { providePrimeNG } from 'primeng/config';

import { environment } from '../environments/environment';
import { appRoutes } from './app.routes';
import { createTranslateLoader } from './common/config/i18n.config';
import { theme } from './common/config/theme';
import { tokenInterceptor } from './common/interceptors/token.interceptor';
import { MessageService } from 'primeng/api';
import { errorHandlerInterceptor } from './common/interceptors/error-handler.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    MessageService,
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient],
        },
      }),
    ),
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
          renewTimeBeforeTokenExpiresInSeconds: 30,
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
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: theme,
        options: {
          darkModeSelector: '.dark',
        },
      },
    }),
    provideHttpClient(withInterceptors([tokenInterceptor, errorHandlerInterceptor])),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
  ],
};
