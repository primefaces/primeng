import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CalendarSoftRangeDemo } from './calendarsoftrangedemo';

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: CalendarSoftRangeDemo }])],
    exports: [RouterModule]
})
export class CalendarSoftRangeDemoRoutingModule {}
