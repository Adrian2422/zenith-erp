import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

import { environment } from '../environments/environment';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  public readonly oidc = inject(OidcSecurityService);
  constructor() {
    console.log(environment.production);
  }

  public logout(): void {
    this.oidc.logoff().subscribe((result) => console.log(result));
  }
}
