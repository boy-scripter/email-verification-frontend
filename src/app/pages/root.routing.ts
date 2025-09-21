import { Routes } from '@angular/router';
import { DashboardLayout } from './dashboard/dashboard.layout';
import { ModalLayoutComponent } from './modal/modal.layout';

export const RootRouting: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'modal',
    outlet: 'modal',
    component: ModalLayoutComponent,
    loadChildren: () => import('./modal/modal.routing').then((r) => r.ModalRoutes),
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
