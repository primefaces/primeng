import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChartModule } from 'primeng/chart';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { ChartBasicDemo } from './basicdoc';
import { ChartjsDoc } from './chartjsdoc';
import { ChartComboDemo } from './combodoc';
import { ChartDoughnutDemo } from './doughnutdoc';
import { ChartHorizontalBarDemo } from './horizontalbardoc';
import { ImportDoc } from './importdoc';
import { ChartLineDemo } from './linedoc';
import { ChartLineStyleDemo } from './linestyledoc';
import { MethodsDoc } from './methodsdoc';
import { ChartMultiAxiDemo } from './multiaxisdoc';
import { ChartPieDemo } from './piedoc';
import { ChartPolarAreaDemo } from './polarareadoc';
import { PropsDoc } from './propsdoc';
import { ChartRadarDemo } from './radardoc';
import { ChartStackedBarDemo } from './stackedbardoc';
import { ChartVerticalBarDemo } from './verticalbardoc';

@NgModule({
    imports: [CommonModule, RouterModule, AppCodeModule, ChartModule, AppDocModule],
    declarations: [
        ChartBasicDemo,
        ChartjsDoc,
        ChartComboDemo,
        ChartDoughnutDemo,
        ChartHorizontalBarDemo,
        ImportDoc,
        ChartLineDemo,
        ChartLineStyleDemo,
        MethodsDoc,
        ChartMultiAxiDemo,
        ChartPieDemo,
        ChartPolarAreaDemo,
        PropsDoc,
        ChartRadarDemo,
        ChartStackedBarDemo,
        ChartVerticalBarDemo
    ],
    exports: [AppDocModule]
})
export class ChartDocModule {}
