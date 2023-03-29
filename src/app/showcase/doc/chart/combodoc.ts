import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'chart-combo-demo',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>Different chart types can be combined in the same graph usign the <i>type</i> option of a dataset.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart type="line" [data]="data" [options]="options"></p-chart>
        </div>
        <app-code [code]="code" selector="chart-combo-demo"></app-code>
    </section>`
})
export class ComboDoc implements OnInit {
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
            const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

            this.data = {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                    {
                        type: 'line',
                        label: 'Dataset 1',
                        borderColor: documentStyle.getPropertyValue('--blue-500'),
                        borderWidth: 2,
                        fill: false,
                        tension: 0.4,
                        data: [50, 25, 12, 48, 56, 76, 42]
                    },
                    {
                        type: 'bar',
                        label: 'Dataset 2',
                        backgroundColor: documentStyle.getPropertyValue('--green-500'),
                        data: [21, 84, 24, 75, 37, 65, 34],
                        borderColor: 'white',
                        borderWidth: 2
                    },
                    {
                        type: 'bar',
                        label: 'Dataset 3',
                        backgroundColor: documentStyle.getPropertyValue('--orange-500'),
                        data: [41, 52, 24, 74, 23, 21, 32]
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
    }

    code: Code = {
        basic: `
<p-chart type="line" [data]="data" [options]="options"></p-chart>`,
        html: `
<div class="card">
    <p-chart type="line" [data]="data" [options]="options"></p-chart>
</div>`,
        typescript: `
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'chart-combo-demo',
    templateUrl: './chart-combo-demo.html'
})
export class ChartComboDemo implements OnInit {
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
                    type: 'line',
                    label: 'Dataset 1',
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    borderWidth: 2,
                    fill: false,
                    tension: 0.4,
                    data: [50, 25, 12, 48, 56, 76, 42]
                },
                {
                    type: 'bar',
                    label: 'Dataset 2',
                    backgroundColor: documentStyle.getPropertyValue('--green-500'),
                    data: [21, 84, 24, 75, 37, 65, 34],
                    borderColor: 'white',
                    borderWidth: 2
                },
                {
                    type: 'bar',
                    label: 'Dataset 3',
                    backgroundColor: documentStyle.getPropertyValue('--orange-500'),
                    data: [41, 52, 24, 74, 23, 21, 32]
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
}`
    };
}
