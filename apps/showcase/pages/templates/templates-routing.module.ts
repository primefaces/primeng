import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TemplatesComponent } from './templates.component';
import { ButtonModule } from 'primeng/button';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', pathMatch: 'full', component: TemplatesComponent },
            { path: 'apollo', loadComponent: () => import('./apollo/apollo').then((m) => m.ApolloPage) },
            { path: 'atlantis', loadComponent: () => import('./atlantis/atlantis').then((m) => m.AtlantisPage) },
            { path: 'avalon', loadComponent: () => import('./avalon/avalon').then((m) => m.AvalonPage) },
            { path: 'diamond', loadComponent: () => import('./diamond/diamond').then((m) => m.DiamondPage) },
            { path: 'freya', loadComponent: () => import('./freya/freya').then((m) => m.FreyaPage) },
            { path: 'poseidon', loadComponent: () => import('./poseidon/poseidon').then((m) => m.PoseidonPage) },
            { path: 'sakai', loadComponent: () => import('./sakai/sakai').then((m) => m.SakaiPage) },
            { path: 'ultima', loadComponent: () => import('./ultima/ultima').then((m) => m.UltimaPage) },
            { path: 'verona', loadComponent: () => import('./verona/verona').then((m) => m.VeronaPage) },
            { path: 'genesis', loadComponent: () => import('./genesis/genesis').then((m) => m.GenesisPage) }
        ])
    ],
    exports: [RouterModule, ButtonModule]
})
export class TemplatesRoutingModule {}
