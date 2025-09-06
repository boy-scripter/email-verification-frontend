import { Routes } from '@angular/router';
import { HomePage } from './home/home.page';

export const RootRouting: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        title: 'Home',
        component: HomePage
    }
]