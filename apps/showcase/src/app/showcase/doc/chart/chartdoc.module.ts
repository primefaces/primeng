import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChartModule } from 'primeng/chart';
import { AppDocModule } from '@layout/doc/app.doc.module';
import { AppCodeModule } from '@layout/doc/app.code.component';
import { AccessibilityDoc } from './accessibilitydoc';
import { BasicDoc } from './basicdoc';
import { ChartjsDoc } from './chartjsdoc';
import { ComboDoc } from './combodoc';
import { DoughnutDoc } from './doughnutdoc';
import { HorizontalBarDoc } from './horizontalbardoc';
import { ImportDoc } from './importdoc';
import { LineDoc } from './linedoc';
import { LineStyleDoc } from './linestyledoc';
import { MethodsDoc } from './methodsdoc';
import { MultiAxisDoc } from './multiaxisdoc';
import { PieDoc } from './piedoc';
import { PolarAreaDoc } from './polarareadoc';
import { PropsDoc } from './propsdoc';
import { RadarDoc } from './radardoc';
import { StackedBarDoc } from './stackedbardoc';
import { VerticalBarDoc } from './verticalbardoc';

@NgModule({
    imports: [CommonModule, RouterModule, AppCodeModule, ChartModule, AppDocModule],
    declarations: [BasicDoc, ChartjsDoc, ComboDoc, DoughnutDoc, HorizontalBarDoc, ImportDoc, LineDoc, LineStyleDoc, MethodsDoc, MultiAxisDoc, PieDoc, PolarAreaDoc, PropsDoc, RadarDoc, StackedBarDoc, VerticalBarDoc, AccessibilityDoc],
    exports: [AppDocModule]
})
export class ChartDocModule {}
