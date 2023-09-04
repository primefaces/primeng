import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'chart-doughnut-demo',
    template: ` <section class="py-3">
        <app-docsectiontext [title]="title" [id]="id">
            <p>A doughnut chart is a variant of the pie chart, with a blank center allowing for additional information about the data as a whole to be included.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-chart type="doughnut" [data]="data" [options]="options"></p-chart>
        </div>
        <app-code [code]="code" selector="chart-doughnut-demo"></app-code>
    </section>`
})
export class DoughnutDoc implements OnInit {
    @Input() id: string;

    @Input() title: string;

    data: any;

    options: any;

    constructor(@Inject(PLATFORM_ID) private platformId: any) {}

    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            const documentStyle = getComputedStyle(document.documentElement);
            const textColor = documentStyle.getPropertyValue('--text-color');

            this.data = {
                labels: ['A', 'B', 'C'],
                datasets: [
                    {
                        data: [300, 50, 100],
                        backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
                        hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
                    }
                ]
            };

            this.options = {
                cutout: '60%',
                plugins: {
                    legend: {
                        labels: {
                            color: textColor
                        }
                    }
                }
            };
        }
    }

    code: Code = {
        basic: `
<p-chart type="doughnut" [data]="data" [options]="options"></p-chart>`,
        html: `
<div class="card flex justify-content-center">
    <p-chart type="doughnut" [data]="data" [options]="options"></p-chart>
</div>`,
        typescript: `
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'chart-doughnut-demo',
    templateUrl: './chart-doughnut-demo.html'
})
export class ChartDoughnutDemo implements OnInit {
    data: any;

    options: any;

    ngOnInit() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');

        this.data = {
            labels: ['A', 'B', 'C'],
            datasets: [
                {
                    data: [300, 50, 100],
                    backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
                    hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
                }
            ]
        };


        this.options = {
            cutout: '60%',
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            }
        };
    }
}`
    };
}
