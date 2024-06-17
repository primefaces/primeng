import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CalendarDocModule } from '@doc/calendar/calendardoc.module';
import { CalendarDemo } from './calendardemo';
import { CalendarDemoRoutingModule } from './calendardemo-routing.module';

@NgModule({
    imports: [CommonModule, CalendarDemoRoutingModule, CalendarDocModule],
    declarations: [CalendarDemo]
})
export class CalendarDemoModule {}
