import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { Code } from '@domain/code';
import { Subscription, debounceTime } from 'rxjs';
import { AppConfigService } from '@service/appconfigservice';
@Component({
    selector: 'chart-line-style-demo',
    template: `
        <app-docsectiontext>
            <p>Various styles of a line series can be customized to display customizations like an area chart.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart type="line" [data]="data" [options]="options" class="h-[30rem]" />
        </div>
        <app-code [code]="code" selector="chart-line-style-demo"></app-code>
    `,
})
export class LineStyleDoc implements OnInit {
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
            const textColor = documentStyle.getPropertyValue('--p-text-color');
            const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
            const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

            this.data = {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                    {
                        label: 'First Dataset',
                        data: [65, 59, 80, 81, 56, 55, 40],
                        fill: false,
                        tension: 0.4,
                        borderColor: documentStyle.getPropertyValue('--p-cyan-500'),
                    },
                    {
                        label: 'Second Dataset',
                        data: [28, 48, 40, 19, 86, 27, 90],
                        fill: false,
                        borderDash: [5, 5],
                        tension: 0.4,
                        borderColor: documentStyle.getPropertyValue('--p-orange-500'),
                    },
                    {
                        label: 'Third Dataset',
                        data: [12, 51, 62, 33, 21, 62, 45],
                        fill: true,
                        borderColor: documentStyle.getPropertyValue('--p-gray-500'),
                        tension: 0.4,
                        backgroundColor: 'rgba(107, 114, 128, 0.2)',
                    },
                ],
            };

            this.options = {
                maintainAspectRatio: false,
                aspectRatio: 0.6,
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

    code: Code = {
        basic: `<p-chart type="line" [data]="data" [options]="options" class="h-[30rem]" />`,
        html: `<div class="card">
    <p-chart type="line" [data]="data" [options]="options" class="h-[30rem]" />
</div>`,
        typescript: `import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';

@Component({
    selector: 'chart-line-style-demo',
    templateUrl: './chart-line-style-demo.html',
    standalone: true,
    imports: [ChartModule]
})
export class ChartLineStyleDemo implements OnInit {
    data: any;

    options: any;

    ngOnInit() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--p-text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
        const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');
        
        this.data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
               {
                    label: 'First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    tension: 0.4,
                    borderColor: documentStyle.getPropertyValue('--p-cyan-500')
                },
                {
                    label: 'Second Dataset',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    borderDash: [5, 5],
                    tension: 0.4,
                    borderColor: documentStyle.getPropertyValue('--p-orange-500')
                },
                {
                    label: 'Third Dataset',
                    data: [12, 51, 62, 33, 21, 62, 45],
                    fill: true,
                    borderColor: documentStyle.getPropertyValue('--p-gray-500'),
                    tension: 0.4,
                    backgroundColor: 'rgba(107, 114, 128, 0.2)'
                }
            ]
        };
        
        this.options = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
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
}`,
    };
}
