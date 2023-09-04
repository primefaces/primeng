import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'chart-pie-demo',
    template: ` <section class="py-3">
        <app-docsectiontext [title]="title" [id]="id">
            <p>A pie chart is a circular statistical graphic which is divided into slices to illustrate numerical proportion.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-chart type="pie" [data]="data" [options]="options"></p-chart>
        </div>
        <app-code [code]="code" selector="chart-pie-demo"></app-code>
    </section>`
})
export class PieDoc implements OnInit {
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
                        data: [540, 325, 702],
                        backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
                        hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
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
    }

    code: Code = {
        basic: `
<p-chart type="pie" [data]="data" [options]="options"></p-chart>`,
        html: `
<div class="card flex justify-content-center">
    <p-chart type="pie" [data]="data" [options]="options"></p-chart>
</div>`,
        typescript: `
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'chart-pie-demo',
    templateUrl: './chart-pie-demo.html'
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
                    backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
                    hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
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
}`
    };
}
