import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { Button } from 'primeng/button';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputText } from 'primeng/inputtext';

import { UsersService } from '../../../common/api/users.service';
import { DialogResult } from '../../../common/interfaces/dialog-result.interface';

@Component({
  selector: 'app-address-form',
  imports: [TranslatePipe, InputText, ReactiveFormsModule, Button],
  templateUrl: './address-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddressFormComponent {
  private readonly userApiService = inject(UsersService);
  public readonly dialogRef = inject(DynamicDialogRef);
  public readonly form = new FormGroup({
    country: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    city: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    street: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    postalCode: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    buildingNo: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    localNo: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  public readonly translateBase = 'view.profile';

  public save(): void {
    if (this.form.invalid) {
      return;
    }
    this.userApiService.usersUpdateAddress(this.form.getRawValue()).subscribe(() => {
      this.dialogRef.close(<DialogResult>{ isModified: true });
    });
  }

  public close(): void {
    this.dialogRef.close();
  }
}
