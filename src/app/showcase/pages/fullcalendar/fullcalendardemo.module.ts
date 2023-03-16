import { NgModule } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { TabViewModule } from 'primeng/tabview';
import { AppCodeModule } from 'src/app/showcase/layout/doc/code/app.code.component';
import { AppDemoActionsModule } from '../../layout/demoactions/app.demoactions.component';
import { FullCalendarDemo } from './fullcalendardemo';
import { FullCalendarDemoRoutingModule } from './fullcalendardemo-routing.module';

@NgModule({
    imports: [FullCalendarDemoRoutingModule, TabViewModule, AppDemoActionsModule, AppCodeModule, FullCalendarModule],
    declarations: [FullCalendarDemo]
})
export class FullCalendarDemoModule {}
