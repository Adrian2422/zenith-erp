import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { MessageService } from 'primeng/api';
import { Observable, of } from 'rxjs';

import { ProfileComponent } from './profile.component';

class OidcSecurityServiceStub {
  public getUserData(): Observable<unknown> {
    return of({
      name: 'Test',
    });
  }
}

const fakeMessageService = {};

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileComponent, TranslateTestingModule.withTranslations({})],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: OidcSecurityService, useClass: OidcSecurityServiceStub },
        { provide: MessageService, useValue: fakeMessageService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
