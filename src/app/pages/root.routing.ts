import { Routes } from '@angular/router';
import { authGuard } from '../guards';
import { DashboardLayout } from './dashboard/dashboard.layout';
import { ModalLayoutComponent } from './modal/modal.layout';

export const RootRouting: Routes = [
  {
    path: 'modal',
    outlet: 'modal',
    component: ModalLayoutComponent,
    loadChildren: () => import('./modal/modal.routing').then((r) => r.ModalRoutes),
  },
  {
    path: 'dashboard',
    component: DashboardLayout,
    canActivate: [authGuard],
    loadChildren: () => import('./dashboard/dashboard.routing').then((r) => r.DashboardRoutes),
  },
  {
    path: 'home',
    title: 'Home',
    loadComponent: () => import('./home/home.page').then((c) => c.HomePage),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
];
