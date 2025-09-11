import { Routes } from '@angular/router';

export const RootRouting: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'modal',
        outlet: 'modal',
        loadChildren: () => import('./modal/modal.routing').then(m => m.ModalRouting)
    },
    {
        path: 'home',
        title: 'Home',
        loadComponent: () => import('./home/home.page').then(m => m.HomePage)
    }
]