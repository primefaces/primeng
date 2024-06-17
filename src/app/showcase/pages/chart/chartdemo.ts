import { Component } from '@angular/core';
import { ChartjsDoc } from '@doc/chart/chartjsdoc';
import { ImportDoc } from '@doc/chart/importdoc';
import { BasicDoc } from '@doc/chart/basicdoc';
import { PieDoc } from '@doc/chart/piedoc';
import { DoughnutDoc } from '@doc/chart/doughnutdoc';
import { ComboDoc } from '@doc/chart/combodoc';
import { HorizontalBarDoc } from '@doc/chart/horizontalbardoc';
import { LineDoc } from '@doc/chart/linedoc';
import { MultiAxisDoc } from '@doc/chart/multiaxisdoc';
import { PolarAreaDoc } from '@doc/chart/polarareadoc';
import { RadarDoc } from '@doc/chart/radardoc';
import { StackedBarDoc } from '@doc/chart/stackedbardoc';
import { VerticalBarDoc } from '@doc/chart/verticalbardoc';
import { LineStyleDoc } from '@doc/chart/linestyledoc';
import { PropsDoc } from '@doc/chart/propsdoc';
import { MethodsDoc } from '@doc/chart/methodsdoc';
import { AccessibilityDoc } from '@doc/chart/accessibilitydoc';

@Component({
    templateUrl: './chartdemo.html'
})
export class ChartDemo {
    docs = [
        {
            id: 'import',
            label: 'Import',
            component: ImportDoc
        },
        {
            id: 'chartjs',
            label: 'Chart.js',
            component: ChartjsDoc
        },
        {
            id: 'basic',
            label: 'Basic',
            component: BasicDoc
        },
        {
            id: 'pie',
            label: 'Pie',
            component: PieDoc
        },
        {
            id: 'doughnut',
            label: 'Doughnut',
            component: DoughnutDoc
        },
        {
            id: 'verticalbar',
            label: 'Vertical Bar',
            component: VerticalBarDoc
        },
        {
            id: 'horizontalbar',
            label: 'Horizontal Bar',
            component: HorizontalBarDoc
        },
        {
            id: 'stackedbar',
            label: 'Stacked Bar',
            component: StackedBarDoc
        },
        {
            id: 'line',
            label: 'Line',
            component: LineDoc
        },
        {
            id: 'multiaxis',
            label: 'MultiAxis',
            component: MultiAxisDoc
        },
        {
            id: 'linestyles',
            label: 'Line Styles',
            component: LineStyleDoc
        },
        {
            id: 'polararea',
            label: 'Polar Area',
            component: PolarAreaDoc
        },
        {
            id: 'Radar',
            label: 'Radar',
            component: RadarDoc
        },
        {
            id: 'combo',
            label: 'Combo',
            component: ComboDoc
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];

    apiDocs = [
        {
            id: 'properties',
            label: 'Properties',
            component: PropsDoc
        },
        {
            id: 'methods',
            label: 'Methods',
            component: MethodsDoc
        }
    ];
}
