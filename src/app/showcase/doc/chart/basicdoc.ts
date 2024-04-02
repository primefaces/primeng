import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Code } from '@domain/code';
import { AppConfigService } from '@service/appconfigservice';
import { Subscription, debounceTime } from 'rxjs';

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
            <p-chart type="bar" [data]="basicData" [options]="basicOptions"></p-chart>
        </div>
        <app-code [code]="code" selector="chart-basic-demo"></app-code>
    `
})
export class BasicDoc implements OnInit {
    basicData: any;

    basicOptions: any;

    subscription!: Subscription;

    constructor(@Inject(PLATFORM_ID) private platformId: any, private configService: AppConfigService, private cd: ChangeDetectorRef) {
        this.subscription = this.configService.configUpdate$.pipe(debounceTime(25)).subscribe((config) => {
            this.initChart();
            this.cd.markForCheck();
        });
    }

    ngOnInit() {
        this.initChart();
    }

    initChart() {
        if (isPlatformBrowser(this.platformId)) {
            const documentStyle = getComputedStyle(document.documentElement);
            const textColor = documentStyle.getPropertyValue('--text-color');
            const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
            const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

            this.basicData = {
                labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                datasets: [
                    {
                        label: 'Sales',
                        data: [540, 325, 702, 620],
                        backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
                        borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
                        borderWidth: 1
                    }
                ]
            };

            this.basicOptions = {
                plugins: {
                    legend: {
                        labels: {
                            fontColor: textColor
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
                            display: false,
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
    }

    code: Code = {
        basic: `<p-chart type="bar" [data]="basicData" [options]="basicOptions"></p-chart>`,
        html: `
<div class="card">
    <p-chart type="bar" [data]="basicData" [options]="basicOptions"></p-chart>
</div>`,
        typescript: `
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'chart-basic-demo',
    templateUrl: './chart-basic-demo.html'
})
export class ChartBasicDemo implements OnInit {
    basicData: any;

    basicOptions: any;

    ngOnInit() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.basicData = {
            labels: ['Q1', 'Q2', 'Q3', 'Q4'],
            datasets: [
                {
                    label: 'Sales',
                    data: [540, 325, 702, 620],
                    backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
                    borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
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
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                x: {
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
}`
    };
}
