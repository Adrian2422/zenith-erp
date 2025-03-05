import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import {
  LogLevel,
  provideAuth,
  withAppInitializerAuthCheck,
} from 'angular-auth-oidc-client';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
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
      ],
      imports: [AppComponent, RouterModule.forRoot([])],
    }).compileComponents();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = <HTMLElement>fixture.nativeElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello world!');
  });
});
