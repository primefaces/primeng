import { Code } from '@/domain/code';
import { AppConfigService } from '@/service/appconfigservice';
import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, effect, inject, OnInit, PLATFORM_ID } from '@angular/core';

@Component({
    selector: 'chart-basic-demo',
    template: `
        <app-docsectiontext>
            <p>
                A chart is configured with 3 properties; <i>type</i>, <i>data</i> and <i>options</i>. Chart type is defined using the <i>type</i> property that accepts <i>pie</i>, <i>doughtnut</i>, <i>line</i>, <i>bar</i>, <i>radar</i> and
                <i>polarArea</i> as a value. The <i>data</i> defines datasets represented with the chart and the <i>options</i> provide numerous customization options to customize the presentation.
            </p>
        </app-docsectiontext>
        <div class="card">
            <p-chart type="bar" [data]="basicData" [options]="basicOptions" />
        </div>
        <app-code [code]="code" selector="chart-basic-demo"></app-code>
    `
})
export class BasicDoc implements OnInit {
    basicData: any;

    basicOptions: any;

    platformId = inject(PLATFORM_ID);

    configService = inject(AppConfigService);

    constructor(private cd: ChangeDetectorRef) {}

    themeEffect = effect(() => {
        if (this.configService.theme()) {
            this.initChart();
            this.cd.markForCheck();
        }
    });

    ngOnInit() {
        this.initChart();
    }

    initChart() {
        if (isPlatformBrowser(this.platformId)) {
            const documentStyle = getComputedStyle(document.documentElement);
            const textColor = documentStyle.getPropertyValue('--p-text-color');
            const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
            const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

            this.basicData = {
                labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                datasets: [
                    {
                        label: 'Sales',
                        data: [540, 325, 702, 620],
                        backgroundColor: ['rgba(249, 115, 22, 0.2)', 'rgba(6, 182, 212, 0.2)', 'rgb(107, 114, 128, 0.2)', 'rgba(139, 92, 246, 0.2)'],
                        borderColor: ['rgb(249, 115, 22)', 'rgb(6, 182, 212)', 'rgb(107, 114, 128)', 'rgb(139, 92, 246)'],
                        borderWidth: 1
                    }
                ]
            };

            this.basicOptions = {
                plugins: {
                    legend: {
                        labels: {
                            color: textColor
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: textColorSecondary
                        },
                        grid: {
                            color: surfaceBorder
                        }
                    },
                    y: {
                        beginAtZero: true,
                        ticks: {
                            color: textColorSecondary
                        },
                        grid: {
                            color: surfaceBorder
                        }
                    }
                }
            };
        }
    }

    code: Code = {
        basic: `<p-chart type="bar" [data]="basicData" [options]="basicOptions" />`,
        html: `<div class="card">
    <p-chart type="bar" [data]="basicData" [options]="basicOptions" />
</div>`,
        typescript: `import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, effect, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { AppConfigService } from '@/service/appconfigservice';
import { ChartModule } from 'primeng/chart';

@Component({
    selector: 'chart-basic-demo',
    templateUrl: './chart-basic-demo.html',
    standalone: true,
    imports: [ChartModule]
})
export class ChartBasicDemo implements OnInit {
    basicData: any;

    basicOptions: any;

    platformId = inject(PLATFORM_ID);

    configService = inject(AppConfigService);

    constructor(private cd: ChangeDetectorRef) {}

    themeEffect = effect(() => {
        if (this.configService.theme() && isPlatformBrowser(this.platformId)) {
            this.initChart();
            this.cd.markForCheck();
        }
    });

    ngOnInit() {
        this.initChart();
    }

    initChart() {
        if (isPlatformBrowser(this.platformId)) {
            const documentStyle = getComputedStyle(document.documentElement);
            const textColor = documentStyle.getPropertyValue('--p-text-color');
            const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
            const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

            this.basicData = {
                labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                datasets: [
                    {
                        label: 'Sales',
                        data: [540, 325, 702, 620],
                        backgroundColor: [
                            'rgba(249, 115, 22, 0.2)',
                            'rgba(6, 182, 212, 0.2)',
                            'rgb(107, 114, 128, 0.2)',
                            'rgba(139, 92, 246, 0.2)',
                        ],
                        borderColor: ['rgb(249, 115, 22)', 'rgb(6, 182, 212)', 'rgb(107, 114, 128)', 'rgb(139, 92, 246)'],
                        borderWidth: 1,
                    },
                ],
            };

            this.basicOptions = {
                plugins: {
                    legend: {
                        labels: {
                            color: textColor,
                        },
                    },
                },
                scales: {
                    x: {
                        ticks: {
                            color: textColorSecondary,
                        },
                        grid: {
                            color: surfaceBorder,
                        },
                    },
                    y: {
                        beginAtZero: true,
                        ticks: {
                            color: textColorSecondary,
                        },
                        grid: {
                            color: surfaceBorder,
                        },
                    },
                },
            };
        }
    }
}`
    };
}
