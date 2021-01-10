import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {I18NComponent} from './i18n.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {path:'',component: I18NComponent}
        ])
    ], 
    exports: [
        RouterModule
    ]
})
export class I18NRoutingModule {}