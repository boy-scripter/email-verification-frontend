import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './auth/auth.layout';
import { AuthRouting } from './auth/auth.routing';

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
    path: 'home',
    title: 'Home',
    loadComponent: () => import('./home/home.page').then((c) => c.HomePage),
  },
];
