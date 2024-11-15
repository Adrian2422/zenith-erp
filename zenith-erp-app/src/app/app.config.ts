import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
} from '@angular/core';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { provideFileRouter, requestContextInterceptor } from '@analogjs/router';

import { provideTrpcClient } from '../trpc-client';
import { provideStore, provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import * as fromUser from './store/user/user.reducer';
import * as userEffects from './store/user/user.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore(),
    provideState(fromUser.USER_FEATURE_KEY, fromUser.userReducer),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideEffects(userEffects),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideFileRouter(),
    provideClientHydration(),
    provideHttpClient(
      withFetch(),
      withInterceptors([requestContextInterceptor]),
    ),

    provideTrpcClient(),
  ],
};
