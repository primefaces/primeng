import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CalendarSoftRangeDemo } from './calendarsoftrangedemo';
import { CalendarSoftRangeDemoRoutingModule } from './calendarsoftrangedemo-routing.module';
import {CalendarSoftRangeDocModule} from "@doc/calendarsoftrange/calendarsoftrangedoc.module";

@NgModule({
    imports: [CommonModule, CalendarSoftRangeDemoRoutingModule, CalendarSoftRangeDocModule],
    declarations: [CalendarSoftRangeDemo]
})
export class CalendarSoftRangeDemoModule {}
