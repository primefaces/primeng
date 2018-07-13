import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms'

import {CodeHighlighterModule} from '../../../components/codehighlighter/codehighlighter';
import {DatePickerModule} from '../../../components/datepicker/datepicker';
import {TabViewModule} from '../../../components/tabview/tabview';

import {DatepickerDemo} from './datepickerdemo';
import {DatepickerDemoRoutingModule} from './datepickerdemo-routing.module';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,

        DatepickerDemoRoutingModule,

        TabViewModule,
        CodeHighlighterModule,

        DatePickerModule
    ],
    declarations: [DatepickerDemo]
})
export class DatepickerDemoModule {
}
