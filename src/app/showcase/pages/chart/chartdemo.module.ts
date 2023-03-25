import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { ChartDocModule } from '../../doc/chart/chartdoc.module';
import { ChartDemo } from './chartdemo';
import { ChartDemoRoutingModule } from './chartdemo-routing.module';

@NgModule({
    imports: [CommonModule, ChartDemoRoutingModule, ChartModule, ChartDocModule],
    declarations: [ChartDemo]
})
export class ChartDemoModule {}
