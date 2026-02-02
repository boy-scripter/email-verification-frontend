import { Routes } from '@angular/router';

export const AuthModalRouting: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then((c) => c.LoginComponent),
  },
  {
    path: 'signup',
    loadComponent: () => import('./signup/signup.component').then((c) => c.SignupComponent),
  },
  {
    path: 'forgot',
    loadComponent: () => import('./forgot/forgot.component').then((c) => c.ForgotPasswordComponent),
  },
];
