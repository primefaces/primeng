/// <reference path="../../../typedefinition/chart.d.ts" />

import {Component, ElementRef, AfterViewInit, OnDestroy, DoCheck, SimpleChange, Input, Output, EventEmitter, IterableDiffers} from 'angular2/core';

@Component({
    selector: 'p-radarChart',
    template: `
        <canvas [attr.width]="width" [attr.height]="height" (click)="onCanvasClick($event)"></canvas>
    `
})
export class RadarChart implements AfterViewInit, OnDestroy, DoCheck {

    @Input() value: LinearChartData;

    @Input() width: string;

    @Input() height: string;

    @Input() scaleShowLine: boolean = true;

    @Input() angleShowLineOut: boolean = true;

    @Input() scaleShowLabels: boolean = false;

    @Input()  scaleBeginAtZero: boolean = true;

    @Input() angleLineColor: string = "rgba(0,0,0,.1)";

    @Input() angleLineWidth: number = 1;

    @Input() pointLabelFontFamily: string = "'Arial'";

    @Input() pointLabelFontStyle: string = "normal";

    @Input() pointLabelFontSize: number = 10;

    @Input() pointLabelFontColor: string = "#666";

    @Input() pointDot: boolean = true;

    @Input() pointDotRadius: number = 3;

    @Input() pointDotStrokeWidth: number = 1;

    @Input() pointHitDetectionRadius: number = 20;

    @Input() datasetStroke: boolean = true;

    @Input() datasetStrokeWidth: number = 2;

    @Input() datasetFill: boolean = true;

    @Input() legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>";

    @Output() onPointsSelect: EventEmitter<any> = new EventEmitter();

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
            let activePoints = this.chart.getPointsAtEvent(event);
            if(activePoints) {
                this.onPointsSelect.next({originalEvent: event, points: activePoints});
            }
        }
    }

    initChart() {
        if(this.value) {
            this.chart = new Chart(this.el.nativeElement.children[0].getContext("2d")).Radar(this.value, {
                scaleShowLine: this.scaleShowLine,
                angleShowLineOut: this.angleShowLineOut,
                scaleShowLabels: this.scaleShowLabels,
                scaleBeginAtZero: this.scaleBeginAtZero,
                angleLineColor: this.angleLineColor,
                angleLineWidth: this.angleLineWidth,
                pointLabelFontFamily: this.pointLabelFontFamily,
                pointLabelFontStyle: this.pointLabelFontStyle,
                pointLabelFontSize: this.pointLabelFontSize,
                pointLabelFontColor: this.pointLabelFontColor,
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