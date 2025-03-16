import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { mergeMap, take } from 'rxjs/operators';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const whitelistedUrls: string[] = [];

  const shouldSkipToken = whitelistedUrls.some((url) => req.url.includes(url));

  if (shouldSkipToken) {
    return next(req);
  }

  const oidcService = inject(OidcSecurityService);

  return oidcService.getAccessToken().pipe(
    take(1),
    mergeMap((accessToken: string) => {
      const authReq = accessToken ? req.clone({ setHeaders: { Authorization: `Bearer ${accessToken}` } }) : req;

      return next(authReq);
    }),
  );
};
