import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { MessageService } from 'primeng/api';
import { Button } from 'primeng/button';
import { DialogService } from 'primeng/dynamicdialog';
import { Tag } from 'primeng/tag';

import { UsersService } from '../../common/api/users.service';
import { CardComponent } from '../../common/components/card/card.component';
import { DialogResult } from '../../common/interfaces/dialog-result.interface';
import { LayoutService } from '../../common/services/layout.service';
import { AddressFormComponent } from './address-form/address-form.component';

@Component({
  selector: 'app-profile',
  imports: [CardComponent, TranslatePipe, Tag, Button],
  providers: [DialogService],
  templateUrl: './profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
  public readonly layoutService = inject(LayoutService);
  public readonly oidcService = inject(OidcSecurityService);
  public readonly usersService = inject(UsersService);
  public readonly dialogService = inject(DialogService);
  public readonly translate = inject(TranslateService);
  private readonly messageService = inject(MessageService);

  public readonly translateBase = 'view.profile';
  public readonly kcUserData = toSignal(this.oidcService.getUserData());
  public readonly apiUserDataRx = rxResource({
    request: () => this.kcUserData(),
    loader: ({ request: userData }) => this.usersService.usersGet(userData.sub),
  });

  public ngOnInit(): void {
    this.layoutService.setBreadcrumbKeys(['view.profile.header']);
  }

  public openAddressForm(): void {
    const ref = this.dialogService.open(AddressFormComponent, {
      header: this.translate.instant(this.translateBase + '.form.header'),
      width: '50vw',
      modal: true,
      closable: true,
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw',
      },
    });

    ref.onClose.subscribe((result: DialogResult) => {
      if (!result) {
        return;
      }
      if (result.isModified) {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Address info updated successfully.',
          life: 3000,
        });
        this.apiUserDataRx.reload();
      }
    });
  }
}
