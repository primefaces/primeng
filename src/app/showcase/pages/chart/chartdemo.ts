import { Component } from '@angular/core';
import { ChartjsDoc } from '../../doc/chart/chartjsdoc';
import { ImportDoc } from '../../doc/chart/importdoc';
import { ChartBasicDemo } from '../../doc/chart/basicdoc';
import { ChartPieDemo } from '../../doc/chart/piedoc';
import { ChartDoughnutDemo } from '../../doc/chart/doughnutdoc';
import { ChartComboDemo } from '../../doc/chart/combodoc';
import { ChartHorizontalBarDemo } from '../../doc/chart/horizontalbardoc';
import { ChartLineDemo } from '../../doc/chart/linedoc';
import { ChartMultiAxiDemo } from '../../doc/chart/multiaxisdoc';
import { ChartPolarAreaDemo } from '../../doc/chart/polarareadoc';
import { ChartRadarDemo } from '../../doc/chart/radardoc';
import { ChartStackedBarDemo } from '../../doc/chart/stackedbardoc';
import { ChartVerticalBarDemo } from '../../doc/chart/verticalbardoc';
import { ChartLineStyleDemo } from '../../doc/chart/linestyledoc';
import { PropsDoc } from '../../doc/chart/propsdoc';
import { MethodsDoc } from '../../doc/chart/methodsdoc';

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
            component: ChartBasicDemo
        },
        {
            id: 'pie',
            label: 'Pie',
            component: ChartPieDemo
        },
        {
            id: 'doughnut',
            label: 'Doughnut',
            component: ChartDoughnutDemo
        },
        {
            id: 'verticalbar',
            label: 'Vertical Bar',
            component: ChartVerticalBarDemo
        },
        {
            id: 'horizontalbar',
            label: 'Horizontal Bar',
            component: ChartHorizontalBarDemo
        },
        {
            id: 'stackedbar',
            label: 'Stacked Bar',
            component: ChartStackedBarDemo
        },
        {
            id: 'line',
            label: 'Line',
            component: ChartLineDemo
        },
        {
            id: 'multiaxis',
            label: 'MultiAxis',
            component: ChartMultiAxiDemo
        },
        {
            id: 'linestyles',
            label: 'Line Styles',
            component: ChartLineStyleDemo
        },
        {
            id: 'polararea',
            label: 'Polar Area',
            component: ChartPolarAreaDemo
        },
        {
            id: 'Radar',
            label: 'Radar',
            component: ChartRadarDemo
        },
        {
            id: 'combo',
            label: 'Combo',
            component: ChartComboDemo
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
