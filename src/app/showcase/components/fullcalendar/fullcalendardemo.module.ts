import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { AppCodeModule } from '../../app.code.component';
import { AppDemoActionsModule } from '../../app.demoactions.component';
import { FullCalendarDemo } from './fullcalendardemo';
import { FullCalendarDemoRoutingModule } from './fullcalendardemo-routing.module';

@NgModule({
    imports: [FullCalendarDemoRoutingModule, TabViewModule, AppDemoActionsModule, AppCodeModule],
    declarations: [FullCalendarDemo],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FullCalendarDemoModule {}
