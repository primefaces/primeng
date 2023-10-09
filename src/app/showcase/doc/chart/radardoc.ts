import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'chart-radar-demo',
    template: ` <section class="py-4">
        <app-docsectiontext [title]="title" [id]="id">
            <p>A radar chart is a graphical method of displaying multivariate data in the form of a two-dimensional chart of three or more quantitative variables represented on axes starting from the same point.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-chart type="radar" [data]="data" [options]="options"></p-chart>
        </div>
        <app-code [code]="code" selector="chart-radar-demo"></app-code>
    </section>`
})
export class RadarDoc implements OnInit {
    @Input() id: string;

    @Input() title: string;

    data: any;

    options: any;

    constructor(@Inject(PLATFORM_ID) private platformId: any) {}

    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            const documentStyle = getComputedStyle(document.documentElement);
            const textColor = documentStyle.getPropertyValue('--text-color');
            const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');

            this.data = {
                labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
                datasets: [
                    {
                        label: 'My First dataset',
                        borderColor: documentStyle.getPropertyValue('--bluegray-400'),
                        pointBackgroundColor: documentStyle.getPropertyValue('--bluegray-400'),
                        pointBorderColor: documentStyle.getPropertyValue('--bluegray-400'),
                        pointHoverBackgroundColor: textColor,
                        pointHoverBorderColor: documentStyle.getPropertyValue('--bluegray-400'),
                        data: [65, 59, 90, 81, 56, 55, 40]
                    },
                    {
                        label: 'My Second dataset',
                        borderColor: documentStyle.getPropertyValue('--pink-400'),
                        pointBackgroundColor: documentStyle.getPropertyValue('--pink-400'),
                        pointBorderColor: documentStyle.getPropertyValue('--pink-400'),
                        pointHoverBackgroundColor: textColor,
                        pointHoverBorderColor: documentStyle.getPropertyValue('--pink-400'),
                        data: [28, 48, 40, 19, 96, 27, 100]
                    }
                ]
            };

            this.options = {
                plugins: {
                    legend: {
                        labels: {
                            color: textColor
                        }
                    }
                },
                scales: {
                    r: {
                        grid: {
                            color: textColorSecondary
                        },
                        pointLabels: {
                            color: textColorSecondary
                        }
                    }
                }
            };
        }
    }

    code: Code = {
        basic: `
<p-chart type="radar" [data]="data" [options]="options"></p-chart>`,
        html: `
<div class="card flex justify-content-center">
    <p-chart type="radar" [data]="data" [options]="options"></p-chart>
</div>`,
        typescript: `
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'chart-radar-demo',
    templateUrl: './chart-radar-demo.html'
})
export class ChartRadarDemo implements OnInit {
    data: any;

    options: any;

    ngOnInit() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        
        this.data = {
            labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
            datasets: [
                {
                    label: 'My First dataset',
                    borderColor: documentStyle.getPropertyValue('--bluegray-400'),
                    pointBackgroundColor: documentStyle.getPropertyValue('--bluegray-400'),
                    pointBorderColor: documentStyle.getPropertyValue('--bluegray-400'),
                    pointHoverBackgroundColor: textColor,
                    pointHoverBorderColor: documentStyle.getPropertyValue('--bluegray-400'),
                    data: [65, 59, 90, 81, 56, 55, 40]
                },
                {
                    label: 'My Second dataset',
                    borderColor: documentStyle.getPropertyValue('--pink-400'),
                    pointBackgroundColor: documentStyle.getPropertyValue('--pink-400'),
                    pointBorderColor: documentStyle.getPropertyValue('--pink-400'),
                    pointHoverBackgroundColor: textColor,
                    pointHoverBorderColor: documentStyle.getPropertyValue('--pink-400'),
                    data: [28, 48, 40, 19, 96, 27, 100]
                }
            ]
        };
        
        this.options = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                r: {
                    grid: {
                        color: textColorSecondary
                    },
                    pointLabels: {
                        color: textColorSecondary
                    }
                }
            }
        };
    }
}`
    };
}
