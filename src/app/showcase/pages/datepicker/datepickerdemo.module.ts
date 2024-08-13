import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DatePickerDemo } from './datepickerdemo';
import { DatePickerDemoRoutingModule } from './datepickerdemo-routing.module';
import { DatePickerDocModule } from '@doc/datepicker/datepickerdoc.module';

@NgModule({
    imports: [CommonModule, DatePickerDemoRoutingModule, DatePickerDocModule],
    declarations: [DatePickerDemo]
})
export class DatePickerDemoModule {}
