import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DatePickerDemo } from './datepickerdemo';

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: DatePickerDemo}])],
    exports: [RouterModule]
})
export class DatePickerDemoRoutingModule {}
