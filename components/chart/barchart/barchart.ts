/// <reference path="../../../typedefinition/chart.d.ts" />

import {Component, ElementRef, AfterViewInit, OnDestroy, DoCheck, SimpleChange, Input, Output, EventEmitter, IterableDiffers} from 'angular2/core';

@Component({
    selector: 'p-barChart',
    template: `
        <canvas [attr.width]="width" [attr.height]="height" (click)="onCanvasClick($event)"></canvas>
    `
})
export class BarChart implements AfterViewInit, OnDestroy, DoCheck {

    @Input() value: LinearChartData;

    @Input() width: string;

    @Input() height: string;

    @Input() scaleBeginAtZero: boolean = true;

    @Input() scaleShowGridLines: boolean = true;

    @Input() scaleGridLineColor: string = "rgba(0,0,0,.05)";

    @Input() scaleGridLineWidth: number = 1;

    @Input() scaleShowHorizontalLines: boolean = true;

    @Input() scaleShowVerticalLines: boolean = true;

    @Input() barShowStroke: boolean = true;

    @Input() barStrokeWidth: number = 2;

    @Input() barValueSpacing: number = 5;

    @Input() barDatasetSpacing: number  = 1;

    @Input() legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>";

    @Output() onBarsSelect: EventEmitter<any> = new EventEmitter();

    initialized: boolean;

    chart: any;

    differ: any;

    constructor(private el: ElementRef, differs: IterableDiffers) {
        this.differ = differs.find([]).create(null);
    }

    ngAfterViewInit() {
        this.initChart();
        this.initialized = true;
    }

    ngDoCheck() {
        let changes = null;
        try {
            changes = this.differ.diff(this.value);
        } catch (e) {
            if(this.value) {
                changes = this.differ.diff(this.value.datasets);
            }
        }

        if(changes && this.initialized) {
            if (this.chart) {
                this.chart.destroy();
            }

            this.initChart();
        }
    }

    ngOnDestroy() {
        if(this.chart) {
            this.chart.destroy();
            this.initialized = false;
            this.chart = null;
        }
    }

    onCanvasClick(event) {
        if(this.chart) {
            let activeBars = this.chart.getBarsAtEvent(event);
            if(activeBars) {
                this.onBarsSelect.next({originalEvent: event, bars: activeBars});
            }
        }
    }

    initChart() {
        if(this.value) {
            this.chart = new Chart(this.el.nativeElement.children[0].getContext("2d")).Bar(this.value, {
                scaleBeginAtZero: this.scaleBeginAtZero,
                scaleShowGridLines: this.scaleShowGridLines,
                scaleGridLineColor: this.scaleGridLineColor,
                scaleGridLineWidth: this.scaleGridLineWidth,
                scaleShowHorizontalLines: this.scaleShowHorizontalLines,
                scaleShowVerticalLines: this.scaleShowVerticalLines,
                barShowStroke: this.barShowStroke,
                barStrokeWidth: this.barStrokeWidth,
                barValueSpacing: this.barValueSpacing,
                barDatasetSpacing: this.barDatasetSpacing
            });
        }

    }
}