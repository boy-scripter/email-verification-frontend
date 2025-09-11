import { Routes } from '@angular/router';

export const ModalRouting: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./')
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