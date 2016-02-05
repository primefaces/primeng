/// <reference path="../../../typedefinition/chart.d.ts" />

import {Component, ElementRef, AfterViewInit, OnDestroy, DoCheck, SimpleChange, Input, Output, EventEmitter, IterableDiffers} from 'angular2/core';

@Component({
    selector: 'p-lineChart',
    template: `
        <canvas [attr.width]="width" [attr.height]="height"></canvas>
    `
})
export class LineChart implements AfterViewInit, OnDestroy, DoCheck {

    @Input() value: LinearChartData;

    @Input() width: string;

    @Input() height: string;

    @Input() scaleShowGridLines: boolean = true;

    @Input() scaleGridLineColor: string = "rgba(0,0,0,.05)";

    @Input() scaleGridLineWidth: number = 1;

    @Input() scaleShowHorizontalLines: boolean = true;

    @Input() scaleShowVerticalLines: boolean = true;

    @Input() bezierCurve: boolean = true;

    @Input() bezierCurveTension: number = 0.4;

    @Input() pointDot: boolean = true;

    @Input() pointDotRadius: number = 4;

    @Input() pointDotStrokeWidth: number = 1;

    @Input() pointHitDetectionRadius: number = 20;

    @Input() datasetStroke: boolean = true;

    @Input() datasetStrokeWidth: number = 2;

    @Input() datasetFill: boolean = true;

    @Input() legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>";

    @Output() onActivePointsSelect: EventEmitter<any> = new EventEmitter();

    chart: any;

    differ: any;

    constructor(private el: ElementRef, differs: IterableDiffers) {
        this.differ = differs.find([]).create(null);
    }

    ngAfterViewInit() {
        this.initChart();

        this.el.nativeElement.children[0].onclick = (event) => {
            let activePoints = this.chart.getPointsAtEvent(event);
            if(activePoints) {
                this.onActivePointsSelect.next({originalEvent: event, activePoints: activePoints});
            }
        };
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

        if(changes) {
            if (this.chart) {
                this.chart.destroy();
            }

            this.initChart();
        }
    }

    ngOnDestroy() {
        if(this.chart) {
            this.chart.destroy();
        }
    }

    initChart() {
        if(this.value) {
            this.chart = new Chart(this.el.nativeElement.children[0].getContext("2d")).Line(this.value, {
                scaleShowGridLines: this.scaleShowGridLines,
                scaleGridLineColor: this.scaleGridLineColor,
                scaleGridLineWidth: this.scaleGridLineWidth,
                scaleShowHorizontalLines: this.scaleShowHorizontalLines,
                scaleShowVerticalLines: this.scaleShowVerticalLines,
                bezierCurve: this.bezierCurve,
                bezierCurveTension: this.bezierCurveTension,
                pointDot: this.pointDot,
                pointDotRadius: this.pointDotRadius,
                pointDotStrokeWidth: this.pointDotStrokeWidth,
                pointHitDetectionRadius: this.pointHitDetectionRadius,
                datasetStroke: this.datasetStroke,
                datasetStrokeWidth: this.datasetStrokeWidth,
                datasetFill: this.datasetFill
            });
        }

    }
}