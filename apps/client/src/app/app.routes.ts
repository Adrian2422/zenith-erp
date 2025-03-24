import { Route } from '@angular/router';

import { isAuthenticatedGuard } from './common/guards/is-authenticated.guard';

export const appRoutes: Route[] = [
  {
    path: '',
    canActivate: [isAuthenticatedGuard],
    loadComponent: () => import('./views/dashboard/dashboard.component').then((c) => c.DashboardComponent),
  },
  {
    path: 'profile',
    canActivate: [isAuthenticatedGuard],
    loadComponent: () => import('./views/profile/profile.component').then((c) => c.ProfileComponent),
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
