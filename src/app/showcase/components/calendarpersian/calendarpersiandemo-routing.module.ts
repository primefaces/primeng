/* بسم الله الرحمن الرحیم */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CalendarPersianDemo } from './calendarpersiandemo';

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: CalendarPersianDemo }])],
    exports: [RouterModule]
})
export class CalendarPersianDemoRoutingModule {}
