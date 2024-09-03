import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Code } from '@domain/code';
import { Subscription, debounceTime } from 'rxjs';
import { AppConfigService } from '@service/appconfigservice';

@Component({
    selector: 'chart-pie-demo',
    template: `
        <app-docsectiontext>
            <p>A pie chart is a circular statistical graphic which is divided into slices to illustrate numerical proportion.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-chart type="pie" [data]="data" [options]="options" class="w-full md:w-[30rem]" />
        </div>
        <app-code [code]="code" selector="chart-pie-demo"></app-code>
    `,
})
export class PieDoc implements OnInit {
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

            this.data = {
                labels: ['A', 'B', 'C'],
                datasets: [
                    {
                        data: [540, 325, 702],
                        backgroundColor: [
                            documentStyle.getPropertyValue('--p-cyan-500'),
                            documentStyle.getPropertyValue('--p-orange-500'),
                            documentStyle.getPropertyValue('--p-gray-500'),
                        ],
                        hoverBackgroundColor: [
                            documentStyle.getPropertyValue('--p-cyan-400'),
                            documentStyle.getPropertyValue('--p-orange-400'),
                            documentStyle.getPropertyValue('--p-gray-400'),
                        ],
                    },
                ],
            };

            this.options = {
                plugins: {
                    legend: {
                        labels: {
                            usePointStyle: true,
                            color: textColor,
                        },
                    },
                },
            };
        }
    }

    code: Code = {
        basic: `<p-chart type="pie" [data]="data" [options]="options" class="w-full md:w-[30rem]" />`,
        html: `<div class="card flex justify-center">
    <p-chart type="pie" [data]="data" [options]="options" class="w-full md:w-[30rem]" />
</div>`,
        typescript: `import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';

@Component({
    selector: 'chart-pie-demo',
    templateUrl: './chart-pie-demo.html',
    standalone: true,
    imports: [ChartModule]
})
export class ChartPieDemo implements OnInit {
    data: any;

    options: any;

    ngOnInit() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');

        this.data = {
            labels: ['A', 'B', 'C'],
            datasets: [
                {
                    data: [540, 325, 702],
                    backgroundColor: [documentStyle.getPropertyValue('--p-cyan-500'), documentStyle.getPropertyValue('--p-orange-500'), documentStyle.getPropertyValue('--p-gray-500')],
                    hoverBackgroundColor: [documentStyle.getPropertyValue('--p-cyan-400'), documentStyle.getPropertyValue('--p-orange-400'), documentStyle.getPropertyValue('--p-gray-400')]
                }
            ]
        };

        this.options = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,
                        color: textColor
                    }
                }
            }
        };
    }
}`,
    };
}
