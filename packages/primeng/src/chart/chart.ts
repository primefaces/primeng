import { isPlatformBrowser } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, effect, inject, InjectionToken, input, NgModule, output, ViewEncapsulation } from '@angular/core';
import Chart from 'chart.js/auto';
import { SharedModule } from 'primeng/api';
import { BaseComponent } from 'primeng/basecomponent';
import { ChartStyle } from './style/chartstyle';
import { Bind, BindModule } from 'primeng/bind';
import type { ChartData, ChartDataSelectEvent, ChartOptions, ChartPassThrough, ChartPlugin, ChartType } from 'primeng/types/chart';

const CHART_INSTANCE = new InjectionToken<UIChart>('CHART_INSTANCE');

/**
 * Chart groups a collection of contents in tabs.
 * @group Components
 */
@Component({
    selector: 'p-chart',
    standalone: true,
    imports: [SharedModule, BindModule],
    template: ` <canvas role="img" [attr.aria-label]="ariaLabel()" [attr.aria-labelledby]="ariaLabelledBy()" [attr.width]="canvasWidth()" [attr.height]="canvasHeight()" (click)="onCanvasClick($event)" [pBind]="ptm('canvas')"></canvas> `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': "cx('root')",
        '[style]': "sx('root')"
    },
    providers: [ChartStyle, { provide: CHART_INSTANCE, useExisting: UIChart }]
})
export class UIChart extends BaseComponent<ChartPassThrough> {
    /**
     * Type of the chart.
     * @group Props
     */
    type = input<ChartType>();
    /**
     * Array of per-chart plugins to customize the chart behaviour.
     * @group Props
     */
    plugins = input<ChartPlugin[]>([]);
    /**
     * Width of the chart.
     * @group Props
     */
    width = input<string>();
    /**
     * Height of the chart.
     * @group Props
     */
    height = input<string>();
    /**
     * Whether the chart is redrawn on screen size change.
     * @group Props
     */
    responsive = input(true, { transform: booleanAttribute });
    /**
     * Used to define a string that autocomplete attribute the current element.
     * @group Props
     */
    ariaLabel = input<string>();
    /**
     * Establishes relationships between the component and label(s) where its value should be one or more element IDs.
     * @group Props
     */
    ariaLabelledBy = input<string>();
    /**
     * Data to display.
     * @group Props
     */
    data = input<ChartData>();
    /**
     * Options to customize the chart.
     * @group Props
     */
    options = input<ChartOptions>({});
    /**
     * Callback to execute when an element on chart is clicked.
     * @group Emits
     */
    onDataSelect = output<ChartDataSelectEvent>();

    _componentStyle = inject(ChartStyle);

    initialized = false;

    chart: Chart | null = null;

    constructor() {
        super();

        effect(() => {
            const data = this.data();
            const options = this.options();
            if (this.initialized && (data || options)) {
                this.reinit();
            }
        });
    }

    canvasWidth() {
        return this.responsive() && !this.width() ? null : this.width();
    }

    canvasHeight() {
        return this.responsive() && !this.height() ? null : this.height();
    }

    onAfterViewInit() {
        this.initChart();
        this.initialized = true;
    }

    onCanvasClick(event: Event) {
        if (this.chart) {
            const element = this.chart.getElementsAtEventForMode(event as unknown as globalThis.Event, 'nearest', { intersect: true }, false);
            const dataset = this.chart.getElementsAtEventForMode(event as unknown as globalThis.Event, 'dataset', { intersect: true }, false);

            if (element && element[0] && dataset) {
                this.onDataSelect.emit({ originalEvent: event, element: element[0], dataset: dataset });
            }
        }
    }

    initChart() {
        if (isPlatformBrowser(this.platformId)) {
            const opts = this.options() || {};
            opts.responsive = this.responsive();

            // allows chart to resize in responsive mode
            if (opts.responsive && (this.height() || this.width())) {
                opts.maintainAspectRatio = false;
            }

            const type = this.type();
            const data = this.data();
            if (!type || !data) return;

            this.chart = new Chart(this.el.nativeElement.children[0] as HTMLCanvasElement, {
                type,
                data,
                options: this.options(),
                plugins: this.plugins()
            });
        }
    }

    getCanvas(): HTMLCanvasElement {
        return this.el.nativeElement.children[0];
    }

    getBase64Image(): string {
        return this.chart?.toBase64Image() ?? '';
    }

    generateLegend() {
        if (this.chart) {
            return (this.chart as any).generateLegend();
        }
        return undefined;
    }

    refresh() {
        if (this.chart) {
            this.chart.update();
        }
    }

    reinit() {
        if (this.chart) {
            this.chart.destroy();
            this.initChart();
        }
    }

    onDestroy() {
        if (this.chart) {
            this.chart.destroy();
            this.initialized = false;
            this.chart = null;
        }
    }
}

@NgModule({
    imports: [UIChart, SharedModule],
    exports: [UIChart, SharedModule]
})
export class ChartModule {}
