import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Button } from 'primeng/button';

import { CardComponent } from '../../common/components/card/card.component';

@Component({
  selector: 'app-dashboard',
  imports: [AsyncPipe, Button, CardComponent],
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  public readonly oidc = inject(OidcSecurityService);

  public logout(): void {
    this.oidc.logoff().subscribe((result) => console.log(result));
  }
}
