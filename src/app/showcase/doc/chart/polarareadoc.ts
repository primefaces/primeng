import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { Code } from '@domain/code';
import { Subscription, debounceTime } from 'rxjs';
import { AppConfigService } from '@service/appconfigservice';
@Component({
    selector: 'chart-polar-area-demo',
    template: `
        <app-docsectiontext>
            <p>Polar area charts are similar to pie charts, but each segment has the same angle - the radius of the segment differs depending on the value.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-chart type="polarArea" [data]="data" [options]="options" />
        </div>
        <app-code [code]="code" selector="chart-polar-area-demo"></app-code>
    `
})
export class PolarAreaDoc implements OnInit {
    data: any;

    options: any;

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
            const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

            this.data = {
                datasets: [
                    {
                        data: [11, 16, 7, 3, 14],
                        backgroundColor: [
                            documentStyle.getPropertyValue('--red-500'),
                            documentStyle.getPropertyValue('--green-500'),
                            documentStyle.getPropertyValue('--yellow-500'),
                            documentStyle.getPropertyValue('--bluegray-500'),
                            documentStyle.getPropertyValue('--blue-500')
                        ],
                        label: 'My dataset'
                    }
                ],
                labels: ['Red', 'Green', 'Yellow', 'Grey', 'Blue']
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
                            color: surfaceBorder
                        }
                    }
                }
            };
        }
    }

    code: Code = {
        basic: `<p-chart type="polarArea" [data]="data" [options]="options" />`,
        html: `<div class="card flex justify-content-center">
    <p-chart type="polarArea" [data]="data" [options]="options" />
</div>`,
        typescript: `import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';

@Component({
    selector: 'chart-polar-area-demo',
    templateUrl: './chart-polar-area-demo.html',
    standalone: true,
    imports: [ChartModule]
})
export class ChartPolarAreaDemo implements OnInit {
    data: any;

    options: any;

    ngOnInit() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        
        this.data = {
            datasets: [
                {
                    data: [11, 16, 7, 3, 14],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--red-500'),
                        documentStyle.getPropertyValue('--green-500'),
                        documentStyle.getPropertyValue('--yellow-500'),
                        documentStyle.getPropertyValue('--bluegray-500'),
                        documentStyle.getPropertyValue('--blue-500')
                    ],
                    label: 'My dataset'
                }
            ],
            labels: ['Red', 'Green', 'Yellow', 'Grey', 'Blue']
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
                        color: surfaceBorder
                    }
                }
            }
        };
    }
}`
    };
}
