import { Routes } from '@angular/router';

export const AuthRouting: Routes = [
  {
    loadComponent: () => import('./login/login.component').then((c) => c.LoginComponent),
    path: 'login',
  },
  // {
  //     path: 'signup',
  //     component: ''
  // },
  // {
  //     path: 'forgot',
  //     component: ''
  // },
];
