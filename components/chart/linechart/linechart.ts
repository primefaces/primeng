/// <reference path="../../../typedefinition/chart.d.ts" />

import {Component, ElementRef, AfterViewInit, OnDestroy, DoCheck, SimpleChange, Input, Output, EventEmitter, IterableDiffers} from 'angular2/core';

@Component({
    selector: 'p-lineChart',
    template: `
        <canvas [attr.width]="width" [attr.height]="height" (click)="onCanvasClick($event)"></canvas>
    `
})
export class LineChart implements AfterViewInit, OnDestroy, DoCheck {

    @Input() animation: boolean = true;

    @Input() animationSteps: number = 60;

    @Input() animationEasing: string = "easeOutQuart";

    @Input() showScale: boolean = true;

    @Input() scaleOverride: boolean = false;

    @Input() scaleSteps: number = null;

    @Input() scaleStepWidth: number = null;

    @Input() scaleStartValue: number = null;

    @Input() scaleLineColor: string = 'rgba(0,0,0,.1)';

    @Input() scaleLineWidth: number = 1;

    @Input() scaleShowLabels: boolean = true;

    @Input() scaleLabel: string = '<%=value%>';

    @Input() scaleIntegersOnly: boolean = true;

    @Input() scaleBeginAtZero: boolean = true;

    @Input() scaleFontFamily: string = "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif";

    @Input() scaleFontSize: number = 12;

    @Input() scaleFontStyle: string = 'normal';

    @Input() scaleFontColor: string = '#666';

    @Input() responsive: boolean = false;

    @Input() maintainAspectRatio: boolean = true;

    @Input() showTooltips: boolean = true;

    @Input() tooltipFillColor: string = 'rgba(0,0,0,0.8)';

    @Input() tooltipFontFamily: string = "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif";

    @Input() tooltipFontSize: number = 14;

    @Input() tooltipFontStyle: string = 'normal';

    @Input() tooltipFontColor: string = '#fff';

    @Input() tooltipTitleFontFamily: string = "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif";

    @Input() tooltipTitleFontSize: number = 14;

    @Input() tooltipTitleFontStyle: string = 'bold';

    @Input() tooltipTitleFontColor: string = '#fff';

    @Input() tooltipYPadding: number = 6;

    @Input() tooltipXPadding: number = 6;

    @Input() tooltipCaretSize: number = 8;

    @Input() tooltipCornerRadius: number = 6;

    @Input() tooltipXOffset: number = 10;

    @Input() tooltipTemplate: string = "<%if (label){%><%=label%>: <%}%><%= value %>";

    @Input() multiTooltipTemplate: string = "<%= value %>";

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

    @Input() legend: any;

    @Input() legendTemplate: string = "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>";

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

            if(this.legend) {
                this.legend.innerHTML = this.chart.generateLegend();
            }
        }

    }
}