import { Routes } from '@angular/router';
import { LoginModalComponent } from './login.modal';

export const ModalRouting: Routes = [
    {
        path: 'login',
        component : LoginModalComponent
        // loadComponent: () => import('./login.modal').then((c) => c.LoginModalComponent)
    },
    // {
    //     path: 'signup',
    //     component: ''
    // },
    // {
    //     path: 'forgot',
    //     component: ''
    // },
]