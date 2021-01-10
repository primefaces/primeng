import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule}    from '@angular/forms'
import {CalendarDemo} from './calendardemo';
import {CalendarDemoRoutingModule} from './calendardemo-routing.module';
import {CalendarModule} from 'primeng/calendar';
import {TabViewModule} from 'primeng/tabview';
import {AppInputStyleSwitchModule} from '../../app.inputstyleswitch.component';
import {AppCodeModule} from '../../app.code.component';

@NgModule({
	imports: [
		CommonModule,
        FormsModule,
		CalendarDemoRoutingModule,
        CalendarModule,
		TabViewModule,
		AppInputStyleSwitchModule,
		AppCodeModule
	],
	declarations: [
		CalendarDemo
	]
})
export class CalendarDemoModule {}
