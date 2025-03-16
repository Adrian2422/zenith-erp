import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { catchError, map, Observable } from 'rxjs';

export const isAuthenticatedGuard: CanActivateFn = (): Observable<boolean> => {
  const oidc = inject(OidcSecurityService);

  return oidc.isAuthenticated().pipe(
    map((response) => {
      if (response) {
        return true;
      } else {
        oidc.authorize();

        return false;
      }
    }),
    catchError(() => {
      oidc.authorize();

      return [false];
    }),
  );
};
