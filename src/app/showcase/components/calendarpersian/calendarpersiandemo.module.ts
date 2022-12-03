/* بسم الله الرحمن الرحیم */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CalendarPersianModule } from 'primeng/calendarpersian';
import { TabViewModule } from 'primeng/tabview';
import { AppCodeModule } from '../../app.code.component';
import { AppDemoActionsModule } from '../../app.demoactions.component';
import { CalendarPersianDemo } from './calendarpersiandemo';
import { CalendarPersianDemoRoutingModule } from './calendarpersiandemo-routing.module';

@NgModule({
    imports: [CommonModule, FormsModule, CalendarPersianDemoRoutingModule, CalendarPersianModule, TabViewModule, AppDemoActionsModule, AppCodeModule],
    declarations: [CalendarPersianDemo]
})
export class CalendarPersianDemoModule {}
