import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { Code } from '@domain/code';
import { Subscription, debounceTime } from 'rxjs';
import { AppConfigService } from '@service/appconfigservice';
@Component({
    selector: 'chart-horizontal-bar-demo',
    template: `
        <app-docsectiontext>
            <p>A bar chart is rendered horizontally when <i>indexAxis</i> option is set as <i>y</i>.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart type="bar" [data]="data" [options]="options" />
        </div>
        <app-code [code]="code" selector="chart-horizontal-bar-demo"></app-code>
    `,
})
export class HorizontalBarDoc implements OnInit {
    data: any;

    options: any;

    subscription!: Subscription;

    constructor(@Inject(PLATFORM_ID) private platformId: any) {}

    ngOnInit() {
        this.initChart();
    }

    initChart() {
        if (isPlatformBrowser(this.platformId)) {
            const documentStyle = getComputedStyle(document.documentElement);
            const textColor = documentStyle.getPropertyValue('--text-color');
            const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
            const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

            this.data = {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                    {
                        label: 'My First dataset',
                        backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                        borderColor: documentStyle.getPropertyValue('--blue-500'),
                        data: [65, 59, 80, 81, 56, 55, 40],
                    },
                    {
                        label: 'My Second dataset',
                        backgroundColor: documentStyle.getPropertyValue('--pink-500'),
                        borderColor: documentStyle.getPropertyValue('--pink-500'),
                        data: [28, 48, 40, 19, 86, 27, 90],
                    },
                ],
            };

            this.options = {
                indexAxis: 'y',
                maintainAspectRatio: false,
                aspectRatio: 0.8,
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
                            font: {
                                weight: 500,
                            },
                        },
                        grid: {
                            color: surfaceBorder,
                            drawBorder: false,
                        },
                    },
                    y: {
                        ticks: {
                            color: textColorSecondary,
                        },
                        grid: {
                            color: surfaceBorder,
                            drawBorder: false,
                        },
                    },
                },
            };
        }
    }

    code: Code = {
        basic: `<p-chart type="bar" [data]="data" [options]="options" />`,
        html: `<div class="card">
    <p-chart type="bar" [data]="data" [options]="options" />
</div>`,
        typescript: `import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';

@Component({
    selector: 'chart-horizontal-bar-demo',
    templateUrl: './chart-horizontal-bar-demo.html',
    standalone: true,
    imports: [ChartModule]
})
export class ChartHorizontalBarDemo implements OnInit {
    data: any;

    options: any;

    ngOnInit() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'My First dataset',
                    backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    data: [65, 59, 80, 81, 56, 55, 40]
                },
                {
                    label: 'My Second dataset',
                    backgroundColor: documentStyle.getPropertyValue('--pink-500'),
                    borderColor: documentStyle.getPropertyValue('--pink-500'),
                    data: [28, 48, 40, 19, 86, 27, 90]
                }
            ]
        };

        this.options = {
            indexAxis: 'y',
            maintainAspectRatio: false,
            aspectRatio: 0.8,
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
                        color: textColorSecondary,
                        font: {
                            weight: 500
                        }
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
    }
}`,
    };
}
