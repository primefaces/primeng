import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChartDemoRoutingModule} from './chartdemo-routing.module';
import {ChartDemo} from './chartdemo';
import {PieChartDemo} from './piechart/piechartdemo';
import {DoughnutChartDemo} from './doughnutchart/doughnutchartdemo';
import {BarChartDemo} from './barchart/barchartdemo';
import {LineChartDemo} from './linechart/linechartdemo';
import {PolarAreaChartDemo} from './polarareachart/polarareachartdemo';
import {RadarChartDemo} from './radarchart/radarchartdemo';
import {ChartModule} from 'primeng/chart';
import {ToastModule} from 'primeng/toast';
import {TabViewModule} from 'primeng/tabview';
import {AppCodeModule} from '../../app.code.component';

@NgModule({
	imports: [
		CommonModule,
		ChartDemoRoutingModule,
        ChartModule,
        ToastModule,
        TabViewModule,
        AppCodeModule
	],
	declarations: [
		ChartDemo,
        PieChartDemo,
        DoughnutChartDemo,
        BarChartDemo,
        LineChartDemo,
        PolarAreaChartDemo,
        RadarChartDemo
	]
})
export class ChartDemoModule {}
