import { inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of } from 'rxjs';
import { UserActions } from './user.actions';

export const initEffect = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(UserActions.init),
      switchMap(() => of(UserActions.loadUserSuccess({ user: [] }))),
      catchError((error) => {
        console.error('Error', error);
        return of(UserActions.loadUserFailure({ error }));
      }),
    );
  },
  { functional: true },
);
