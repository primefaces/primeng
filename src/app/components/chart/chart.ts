import { ContentChildren, QueryList, NgModule, Component, ElementRef, AfterViewInit, OnDestroy, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation, Inject, PLATFORM_ID, NgZone, booleanAttribute, TemplateRef, AfterContentInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import Chart from 'chart.js/auto';
/**
 * Chart groups a collection of contents in tabs.
 * @group Components
 */
@Component({
    selector: 'p-chart',
    template: `
        <div style="position:relative" [style.width]="responsive && !width ? null : width" [style.height]="responsive && !height ? null : height">
            <div>
                <ng-content select="p-header"></ng-content>
                <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
            </div>
            <canvas role="img" [attr.aria-label]="ariaLabel" [attr.aria-labelledby]="ariaLabelledBy" [attr.width]="responsive && !width ? null : width" [attr.height]="responsive && !height ? null : height" (click)="onCanvasClick($event)"></canvas>
            <div>
                <ng-content select="p-footer"></ng-content>
                <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'p-element'
    }
})
export class UIChart implements AfterContentInit, AfterViewInit, OnDestroy {
    /**
     * Type of the chart.
     * @group Props
     */
    @Input() type: 'bar' | 'line' | 'scatter' | 'bubble' | 'pie' | 'doughnut' | 'polarArea' | 'radar' | undefined;
    /**
     * Array of per-chart plugins to customize the chart behaviour.
     * @group Props
     */
    @Input() plugins: any[] = [];
    /**
     * Width of the chart.
     * @group Props
     */
    @Input() width: string | undefined;
    /**
     * Height of the chart.
     * @group Props
     */
    @Input() height: string | undefined;
    /**
     * Whether the chart is redrawn on screen size change.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) responsive: boolean = true;
    /**
     * Used to define a string that autocomplete attribute the current element.
     * @group Props
     */
    @Input() ariaLabel: string | undefined;
    /**
     * Establishes relationships between the component and label(s) where its value should be one or more element IDs.
     * @group Props
     */
    @Input() ariaLabelledBy: string | undefined;
    /**
     * Data to display.
     * @group Props
     */
    @Input() get data(): any {
        return this._data;
    }
    set data(val: any) {
        this._data = val;
        this.reinit();
    }
    /**
     * Options to customize the chart.
     * @group Props
     */
    @Input() get options(): any {
        return this._options;
    }
    set options(val: any) {
        this._options = val;
        this.reinit();
    }
    /**
     * Callback to execute when an element on chart is clicked.
     * @group Emits
     */
    @Output() onDataSelect: EventEmitter<any> = new EventEmitter<any>();

    @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate> | undefined;

    headerTemplate: TemplateRef<any> | undefined;

    footerTemplate: TemplateRef<any> | undefined;

    isBrowser: boolean = false;

    initialized: boolean | undefined;

    _data: any;

    _options: any = {};

    chart: any;

    constructor(
        @Inject(PLATFORM_ID) private platformId: any,
        public el: ElementRef,
        private zone: NgZone
    ) {}

    ngAfterViewInit() {
        this.initChart();
        this.initialized = true;
    }

    ngAfterContentInit() {
        (this.templates as QueryList<PrimeTemplate>).forEach((item) => {
            switch (item.getType()) {
                case 'header':
                    this.headerTemplate = item.template;
                    break;

                case 'footer':
                    this.footerTemplate = item.template;
                    break;
            }
        });
    }

    onCanvasClick(event: Event) {
        if (this.chart) {
            const element = this.chart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, false);
            const dataset = this.chart.getElementsAtEventForMode(event, 'dataset', { intersect: true }, false);

            if (element && element[0] && dataset) {
                this.onDataSelect.emit({ originalEvent: event, element: element[0], dataset: dataset });
            }
        }
    }

    initChart() {
        if (isPlatformBrowser(this.platformId)) {
            let opts = this.options || {};
            opts.responsive = this.responsive;

            // allows chart to resize in responsive mode
            if (opts.responsive && (this.height || this.width)) {
                opts.maintainAspectRatio = false;
            }

            this.zone.runOutsideAngular(() => {
                this.chart = new Chart(this.el.nativeElement.children[0].children[1], {
                    type: this.type,
                    data: this.data,
                    options: this.options,
                    plugins: this.plugins
                });
            });
        }
    }

    getCanvas() {
        return this.el.nativeElement.children[0].children[0];
    }

    getBase64Image() {
        return this.chart.toBase64Image();
    }

    generateLegend() {
        if (this.chart) {
            return this.chart.generateLegend();
        }
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

    ngOnDestroy() {
        if (this.chart) {
            this.chart.destroy();
            this.initialized = false;
            this.chart = null;
        }
    }
}

@NgModule({
    imports: [CommonModule, ButtonModule],
    exports: [UIChart, SharedModule, ButtonModule],
    declarations: [UIChart]
})
export class ChartModule {}
