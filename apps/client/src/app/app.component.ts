import { AsyncPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  imports: [RouterModule, AsyncPipe],
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  public readonly oidc = inject(OidcSecurityService);
  public readonly http = inject(HttpClient);

  public logout(): void {
    this.oidc.logoff().subscribe((result) => console.log(result));
  }
}
