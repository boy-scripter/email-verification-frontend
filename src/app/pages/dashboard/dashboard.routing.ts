import { Routes } from '@angular/router';

export const DashboardRoutes: Routes = [
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
  {
    path: 'buy-credits',
    loadComponent: () => import('./buy-credits/buy-credit.components').then((c) => c.BuyCreditComponent),
  },
  {
    path: 'invoice',
    loadComponent: () => import('./invoice/invoice.components').then((c) => c.InvoiceComponent),
  },
  {
    path: 'subscriptions',
    loadComponent: () => import('./subscriptions/subscriptions.components').then((c) => c.SubscriptionsComponent),
  },
  {
    path: 'logout',
    loadComponent: () => import('./logout/logout').then((c) => c.LogoutComponent),
  },
];

export const DashboardModalRouting: Routes = [
  {
    path: 'profile',
    loadComponent: () => import('./profile/profile').then((c) => c.ProfileComponent),
  },
];
