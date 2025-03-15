import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-dashboard',
  imports: [AsyncPipe, Button],
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  public readonly oidc = inject(OidcSecurityService);

  public logout(): void {
    this.oidc.logoff().subscribe((result) => console.log(result));
  }
}
