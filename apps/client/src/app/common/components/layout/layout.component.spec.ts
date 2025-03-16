import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import {
  LogLevel,
  provideAuth,
  withAppInitializerAuthCheck,
} from 'angular-auth-oidc-client';

import { environment } from '../../../environments/environment';
import { LayoutComponent } from './layout.component';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  const fakeActivatedRoute = {
    snapshot: {},
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutComponent],
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
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
