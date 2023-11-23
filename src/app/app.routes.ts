import { Routes } from '@angular/router';
import { MenuListComponent } from './menu-list/menu-list.component';

export const routes: Routes = [
    {
        path: 'menu',
        title:'Menu',
        loadComponent: () => import('./menu-list/menu-list.component')
            .then(mod => mod.MenuListComponent)
    },
    {
        path: '**',
        redirectTo: 'menu'
    }
];
