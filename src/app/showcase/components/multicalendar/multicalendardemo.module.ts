import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MultiCalendarDemo} from './multicalendardemo';
import {MultiCalendarDemoRoutingModule} from './multicalendardemo-routing.module';
import {MultiCalendarModule} from 'primeng/multicalendar';
import {TabViewModule} from 'primeng/tabview';
import {AppCodeModule} from '../../app.code.component';
import {AppDemoActionsModule} from '../../app.demoactions.component';
import { CalendarModule } from '../../../components/calendar/calendar';

@NgModule({
	imports: [
		CommonModule,
        FormsModule,
		MultiCalendarDemoRoutingModule,
		MultiCalendarModule,
		CalendarModule,
		TabViewModule,
		AppDemoActionsModule,
		AppCodeModule
	],
	declarations: [
		MultiCalendarDemo
	]
})
export class MultiCalendarDemoModule {}
