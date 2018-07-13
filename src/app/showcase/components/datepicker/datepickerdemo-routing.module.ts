import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router'

import {DatepickerDemo} from './datepickerdemo';


@NgModule({
    imports: [
        RouterModule.forChild([
            {path: '', component: DatepickerDemo}
        ])
    ],
    exports: [RouterModule]
})
export class DatepickerDemoRoutingModule {
}
