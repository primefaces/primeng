import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { AppCodeModule } from 'src/app/showcase/layout/doc/code/app.code.component';
import { ChartDocModule } from '../../doc/chart/chartdoc.module';
import { AppDemoActionsModule } from '../../layout/demoactions/app.demoactions.component';
import { ChartDemo } from './chartdemo';
import { ChartDemoRoutingModule } from './chartdemo-routing.module';

@NgModule({
    imports: [CommonModule, ChartDemoRoutingModule, ChartModule, ToastModule, TabViewModule, AppDemoActionsModule, AppCodeModule, ChartDocModule],
    declarations: [ChartDemo]
})
export class ChartDemoModule {}
