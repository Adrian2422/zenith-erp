import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

import { AddressFormComponent } from './address-form.component';

describe('AddressFormComponent', () => {
  let component: AddressFormComponent;
  let fixture: ComponentFixture<AddressFormComponent>;

  const fakeDynamicDialogRef = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddressFormComponent, TranslateTestingModule.withTranslations({})],
      providers: [provideHttpClient(), provideHttpClientTesting(), { provide: DynamicDialogRef, useValue: fakeDynamicDialogRef }],
    }).compileComponents();

    fixture = TestBed.createComponent(AddressFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
