import {NgModule}     from '@angular/core';
import {RouterModule} from '@angular/router';
import {SupportComponent} from './support.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {path:'',component: SupportComponent}
        ])
    ], 
    exports: [
        RouterModule
    ]
})
export class SupportRoutingModule {}