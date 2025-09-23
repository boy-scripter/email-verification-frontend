import { Routes } from '@angular/router';

export const DashboardRouting: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/dashboard/home',
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.components').then((c) => c.DashboardHomeComponent),
  },
  {
    path: 'support',
    loadComponent: () => import('./support/support.component').then((c) => c.SupportComponent),
  },
  {
    path: 'email-verification',
    loadComponent: () => import('./email-verification/email-verification.component').then((c) => c.EmailVerificationComponent),
  },
];

export const DashboardModalRouting: Routes = [
  {
    path: 'profile',
    loadComponent: () => import('./profile/profile').then((c) => c.ProfileComponent),
  },
];
