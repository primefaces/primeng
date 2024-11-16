import { Code } from '@/domain/code';
import { AppConfigService } from '@/service/appconfigservice';
import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, effect, inject, OnInit, PLATFORM_ID } from '@angular/core';
@Component({
    selector: 'chart-polar-area-demo',
    template: `
        <app-docsectiontext>
            <p>Polar area charts are similar to pie charts, but each segment has the same angle - the radius of the segment differs depending on the value.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-chart type="polarArea" [data]="data" [options]="options" class="w-full md:w-[30rem]" />
        </div>
        <app-code [code]="code" selector="chart-polar-area-demo"></app-code>
    `
})
export class PolarAreaDoc implements OnInit {
    data: any;

    options: any;

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
            const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

            this.data = {
                datasets: [
                    {
                        data: [11, 16, 7, 3, 14],
                        backgroundColor: [
                            documentStyle.getPropertyValue('--p-pink-500'),
                            documentStyle.getPropertyValue('--p-gray-500'),
                            documentStyle.getPropertyValue('--p-orange-500'),
                            documentStyle.getPropertyValue('--p-purple-500'),
                            documentStyle.getPropertyValue('--p-cyan-500')
                        ],
                        label: 'My dataset'
                    }
                ],
                labels: ['Pink', 'Gray', 'Orange', 'Purple', 'Cyan']
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
        basic: `<p-chart type="polarArea" [data]="data" [options]="options" class="w-full md:w-[30rem]" />`,
        html: `<div class="card flex justify-center">
    <p-chart type="polarArea" [data]="data" [options]="options" class="w-full md:w-[30rem]" />
</div>`,
        typescript: `import { isPlatformBrowser } from '@angular/common';
import { Component, OnInit, PLATFORM_ID, ChangeDetectorRef, inject, effect } from '@angular/core';
import { AppConfigService } from '@/service/appconfigservice';
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
            const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

            this.data = {
                datasets: [
                    {
                        data: [11, 16, 7, 3, 14],
                        backgroundColor: [
                            documentStyle.getPropertyValue('--p-pink-500'),
                            documentStyle.getPropertyValue('--p-gray-500'),
                            documentStyle.getPropertyValue('--p-orange-500'),
                            documentStyle.getPropertyValue('--p-purple-500'),
                            documentStyle.getPropertyValue('--p-cyan-500'),
                        ],
                        label: 'My dataset',
                    },
                ],
                labels: ['Pink', 'Gray', 'Orange', 'Purple', 'Cyan'],
            };

            this.options = {
                plugins: {
                    legend: {
                        labels: {
                            color: textColor,
                        },
                    },
                },
                scales: {
                    r: {
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
