import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ThemingComponent} from './theming.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {path:'',component: ThemingComponent}
        ])
    ], 
    exports: [
        RouterModule
    ]
})
export class ThemingRoutingModule {}