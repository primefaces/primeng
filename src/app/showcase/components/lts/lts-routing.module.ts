import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {LTSComponent} from './lts.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {path:'',component: LTSComponent}
        ])
    ], 
    exports: [
        RouterModule
    ]
})
export class LTSRoutingModule {}