import { Code } from '@/domain/code';
import { AppConfigService } from '@/service/appconfigservice';
import { DesignerService } from '@/service/designerservice';
import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, effect, inject, OnInit, PLATFORM_ID } from '@angular/core';

@Component({
    selector: 'chart-line-demo',
    standalone: false,
    template: `
        <app-docsectiontext>
            <p>A line chart or line graph is a type of chart which displays information as a series of data points called 'markers' connected by straight line segments.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart type="line" [data]="data" [options]="options" class="h-[30rem]" />
        </div>
        <app-code [code]="code" selector="chart-line-demo"></app-code>
    `
})
export class LineDoc implements OnInit {
    data: any;

    options: any;

    platformId = inject(PLATFORM_ID);

    configService = inject(AppConfigService);

    designerService = inject(DesignerService);

    constructor(private cd: ChangeDetectorRef) {}

    themeEffect = effect(() => {
        if (this.configService.transitionComplete()) {
            if (this.designerService.preset()) {
                this.initChart();
            }
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

            this.data = {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                    {
                        label: 'First Dataset',
                        data: [65, 59, 80, 81, 56, 55, 40],
                        fill: false,
                        borderColor: documentStyle.getPropertyValue('--p-cyan-500'),
                        tension: 0.4
                    },
                    {
                        label: 'Second Dataset',
                        data: [28, 48, 40, 19, 86, 27, 90],
                        fill: false,
                        borderColor: documentStyle.getPropertyValue('--p-gray-500'),
                        tension: 0.4
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
            this.cd.markForCheck();
        }
    }

    code: Code = {
        basic: `<p-chart type="line" [data]="data" [options]="options" class="h-[30rem]" />`,
        html: `<div class="card">
    <p-chart type="line" [data]="data" [options]="options" class="h-[30rem]" />
</div>`,
        typescript: `import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, effect, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { AppConfigService } from '@/service/appconfigservice';
import { ChartModule } from 'primeng/chart';

@Component({
    selector: 'chart-line-demo',
    templateUrl: './chart-line-demo.html',
    standalone: true,
    imports: [ChartModule]
})
export class ChartLineDemo implements OnInit {
    data: any;

    options: any;

    platformId = inject(PLATFORM_ID);

    configService = inject(AppConfigService);

    designerService = inject(DesignerService);

    constructor(private cd: ChangeDetectorRef) {}

    themeEffect = effect(() => {
        if (this.configService.transitionComplete()) {
            if (this.designerService.preset()) {
                this.initChart();
            }
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

            this.data = {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                    {
                        label: 'First Dataset',
                        data: [65, 59, 80, 81, 56, 55, 40],
                        fill: false,
                        borderColor: documentStyle.getPropertyValue('--p-cyan-500'),
                        tension: 0.4
                    },
                    {
                        label: 'Second Dataset',
                        data: [28, 48, 40, 19, 86, 27, 90],
                        fill: false,
                        borderColor: documentStyle.getPropertyValue('--p-gray-500'),
                        tension: 0.4
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
            this.cd.markForCheck()
        }
    }
}`
    };
}
