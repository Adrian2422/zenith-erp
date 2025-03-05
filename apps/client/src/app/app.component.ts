import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { switchMap } from 'rxjs';

import { environment } from '../environments/environment';

@Component({
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  public readonly oidc = inject(OidcSecurityService);
  public readonly http = inject(HttpClient);
  constructor() {
    console.log(environment.production);
  }

  public ngOnInit(): void {
    this.getUsers();
  }

  public logout(): void {
    this.oidc.logoff().subscribe((result) => console.log(result));
  }

  public getUsers(): void {
    this.oidc
      .getAccessToken()
      .pipe(
        switchMap((accessToken) =>
          this.http.get('http://localhost:3000/api/users', {
            headers: { Authorization: `Bearer ${accessToken}` },
          }),
        ),
      )
      .subscribe((result) => console.log(result));
  }
}
