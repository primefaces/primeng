import { AppMainComponent } from '@/components/layout/app.main.component';
import { LandingComponent } from '@/pages/landing/landing.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', component: LandingComponent, pathMatch: 'full' },
    {
        path: '',
        component: AppMainComponent,
        children: [{ path: 'carousel', loadChildren: () => import('@/pages/carousel/routes') }]
    },
    { path: 'notfound', loadChildren: () => import('@/pages/notfound/routes') },
    { path: '**', redirectTo: '/notfound' }
];
