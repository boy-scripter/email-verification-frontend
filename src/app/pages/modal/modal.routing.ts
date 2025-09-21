import { Routes } from '@angular/router';

export const ModalRoutes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('../auth/auth.routing').then((r) => r.AuthRouting),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('../dashboard/dashboard.routing').then((r) => r.DashboardModalRouting),
  },
];
