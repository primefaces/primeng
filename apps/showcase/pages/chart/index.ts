import { AccessibilityDoc } from '@/doc/chart/accessibility-doc';
import { BasicDoc } from '@/doc/chart/basic-doc';
import { ChartjsDoc } from '@/doc/chart/chartjs-doc';
import { ComboDoc } from '@/doc/chart/combo-doc';
import { DoughnutDoc } from '@/doc/chart/doughnut-doc';
import { HorizontalBarDoc } from '@/doc/chart/horizontalbar-doc';
import { ImportDoc } from '@/doc/chart/import-doc';
import { LineDoc } from '@/doc/chart/line-doc';
import { LineStyleDoc } from '@/doc/chart/linestyle-doc';
import { MultiAxisDoc } from '@/doc/chart/multiaxis-doc';
import { PieDoc } from '@/doc/chart/pie-doc';
import { PolarAreaDoc } from '@/doc/chart/polararea-doc';
import { RadarDoc } from '@/doc/chart/radar-doc';
import { StackedBarDoc } from '@/doc/chart/stackedbar-doc';
import { VerticalBarDoc } from '@/doc/chart/verticalbar-doc';
import { Component } from '@angular/core';
import { AppDoc } from '@/components/doc/app.doc';
import { PTComponent } from '@/doc/chart/pt/PTComponent';
@Component({
    standalone: true,
    imports: [AppDoc],
    template: `
        <app-doc
            docTitle="Angular Chart Component"
            header="Charts"
            description="Chart components are based on Charts.js 3.3.2+, an open source HTML5 based charting library."
            [docs]="docs"
            [apiDocs]="['Chart']"
            themeDocs="chart"
            [ptDocs]="ptComponent"
        ></app-doc>
    `
})
export class ChartDemo {
    ptComponent = PTComponent;

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
}
