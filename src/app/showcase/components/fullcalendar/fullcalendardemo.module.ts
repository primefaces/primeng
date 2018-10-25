import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {FullCalendarDemo} from './fullcalendardemo';
import {FullCalendarDemoRoutingModule} from './fullcalendardemo-routing.module';
import {FullCalendarModule} from '../../../components/fullcalendar/fullcalendar';
import {DialogModule} from '../../../components/dialog/dialog';
import {InputTextModule} from '../../../components/inputtext/inputtext';
import {CalendarModule} from '../../../components/calendar/calendar';
import {CheckboxModule} from '../../../components/checkbox/checkbox';
import {ButtonModule} from '../../../components/button/button';
import {TabViewModule} from '../../../components/tabview/tabview';
import {CodeHighlighterModule} from '../../../components/codehighlighter/codehighlighter';

@NgModule({
	imports: [
		CommonModule,
        FormsModule,
		FullCalendarDemoRoutingModule,
        FullCalendarModule,
        DialogModule,
        InputTextModule,
        CalendarModule,
        CheckboxModule,
        ButtonModule,
        TabViewModule,
        CodeHighlighterModule
	],
	declarations: [
		FullCalendarDemo
	]
})
export class FullCalendarDemoModule {}
