import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TemplatesComponent } from './templates.component';
import { ApolloPage } from './apollo/apollo';
import { AtlantisPage } from './atlantis/atlantis';
import { AvalonPage } from './avalon/avalon';
import { DiamondPage } from './diamond/diamond';
import { FreyaPage } from './freya/freya';
import { PoseidonPage } from './poseidon/poseidon';
import { SakaiPage } from './sakai/sakai';
import { UltimaPage } from './ultima/ultima';
import { VeronaPage } from './verona/verona';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', pathMatch: 'full', component: TemplatesComponent },
            { path: 'apollo', component: ApolloPage },
            { path: 'atlantis', component: AtlantisPage},
            { path: 'avalon', component: AvalonPage},
            { path: 'diamond', component: DiamondPage},
            { path: 'freya', component: FreyaPage},
            { path: 'poseidon', component: PoseidonPage},
            { path: 'sakai', component: SakaiPage},
            { path: 'ultima', component: UltimaPage},
            { path: 'verona', component: VeronaPage},
        ])
    ],
    exports: [RouterModule]
})
export class TemplatesRoutingModule {}
