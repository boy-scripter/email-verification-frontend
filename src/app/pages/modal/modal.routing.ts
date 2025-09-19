import { Routes } from "@angular/router";


export const ModalRoutes: Routes = [

    {
        path: 'auth',
        loadChildren: () => import('../auth/auth.routing').then((r) => r.AuthRouting),
    }
    ,
    // {
    //     path : 'profile',
    //     loadComponent : () =>
    // }



]