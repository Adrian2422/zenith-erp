import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { TranslatePipe } from '@ngx-translate/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';

import { UsersService } from '../../common/api/users.service';
import { CardComponent } from '../../common/components/card/card.component';
import { LayoutService } from '../../common/services/layout.service';

@Component({
  selector: 'app-profile',
  imports: [CardComponent, TranslatePipe],
  templateUrl: './profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
  public readonly layoutService = inject(LayoutService);
  public readonly oidcService = inject(OidcSecurityService);
  public readonly usersService = inject(UsersService);

  public readonly translateBase = 'view.profile';
  public readonly kcUserData = toSignal(this.oidcService.getUserData());
  public readonly apiUserDataRx = rxResource({
    request: () => this.kcUserData(),
    loader: ({ request: userData }) => this.usersService.usersGet(userData.sub),
  });

  public ngOnInit(): void {
    this.layoutService.setBreadcrumbKeys(['view.profile.header']);
  }
}
