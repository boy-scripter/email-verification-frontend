import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './auth/auth.layout';
import { DashboardLayout } from './dashboard/dashboard.layout';

export const RootRouting: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'auth',
    outlet: 'modal',
    component: AuthLayoutComponent,
    loadChildren: () => import('./auth/auth.routing').then((r) => r.AuthRouting),
  },
  {
    path: 'dashboard',
    component: DashboardLayout,
    loadChildren: () => import('./dashboard/dashboard.routing').then((r) => r.DashboardRouting),
  },
  {
    path: 'home',
    title: 'Home',
    loadComponent: () => import('./home/home.page').then((c) => c.HomePage),
  },
];
