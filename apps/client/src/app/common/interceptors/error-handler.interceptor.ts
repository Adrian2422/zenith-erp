import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { catchError, throwError } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const messageService = inject(MessageService);
  const translateService = inject(TranslateService);

  const showError = (detail: string): void => {
    messageService.add({
      severity: 'error',
      summary: 'Error',
      detail,
      life: 3000,
    });
  };

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // Handle different HTTP status codes
      if (error.status === 0) {
        showError(translateService.instant('error.0'));
      } else if (error.status >= 500) {
        showError(translateService.instant('error.500'));
      } else if (error.status === 404) {
        showError(translateService.instant('error.404'));
      } else if (error.status === 401) {
        showError(translateService.instant('error.401'));
      } else {
        showError(translateService.instant('error.unknown') + error.message);
      }

      return throwError(() => error);
    }),
  );
};
