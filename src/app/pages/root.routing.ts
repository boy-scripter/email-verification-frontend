import { Routes } from '@angular/router';
import { ModalLayoutComponent } from './modal/modal.layout';
import { ModalRouting } from './modal/modal.routing';

export const RootRouting: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'auth',
        outlet: 'modal',
        component: ModalLayoutComponent,
        children: ModalRouting
    },
    {
        path: 'home',
        title: 'Home',
        loadComponent: () => import('./home/home.page').then(m => m.HomePage)
    }
]