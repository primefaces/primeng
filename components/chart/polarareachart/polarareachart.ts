/// <reference path="../../../typedefinition/chart.d.ts" />

import {Component, ElementRef, AfterViewInit, OnDestroy, DoCheck, SimpleChange, Input, Output, EventEmitter, IterableDiffers} from 'angular2/core';

@Component({
    selector: 'p-polarAreaChart',
    template: `
        <canvas [attr.width]="width" [attr.height]="height" (click)="onCanvasClick($event)"></canvas>
    `
})
export class PolarAreaChart implements AfterViewInit, OnDestroy, DoCheck {

    @Input() value: CircularChartData[];

    @Input() width: string;

    @Input() height: string;

    @Input() scaleShowLabelBackdrop: boolean = true;

    @Input() scaleBackdropColor: string = "rgba(255,255,255,0.75)";

    @Input() scaleBeginAtZero: boolean = true;

    @Input() scaleBackdropPaddingY: number = 2;

    @Input() scaleBackdropPaddingX: number = 2;

    @Input() scaleShowLine: boolean = true;

    @Input() segmentShowStroke: boolean = true;

    @Input() segmentStrokeColor: string = "#fff";

    @Input() segmentStrokeWidth: number = 2;

    @Input() animationSteps: number = 100;

    @Input() animationEasing: string = "easeOutBounce";

    @Input() animateRotate: boolean = true;

    @Input() animateScale: boolean = false;

    @Input() legendTemplate: string = "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>";

    @Output() onSegmentSelect: EventEmitter<any> = new EventEmitter();

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
        var changes = this.differ.diff(this.value);
        if (changes && this.initialized) {
            if(this.chart) {
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
            let segs = this.chart.getSegmentsAtEvent(event);
            if(segs) {
                this.onSegmentSelect.next({originalEvent: event, segments: segs});
            }
        }
    }

    initChart() {
        if(this.value) {
            this.chart = new Chart(this.el.nativeElement.children[0].getContext("2d")).PolarArea(this.value, {
                scaleShowLabelBackdrop: this.scaleShowLabelBackdrop,
                scaleBackdropColor: this.scaleBackdropColor,
                scaleBeginAtZero: this.scaleBeginAtZero,
                scaleBackdropPaddingY: this.scaleBackdropPaddingY,
                scaleBackdropPaddingX: this.scaleBackdropPaddingX,
                scaleShowLine: this.scaleShowLine,
                segmentShowStroke: this.segmentShowStroke,
                segmentStrokeColor: this.segmentStrokeColor,
                segmentStrokeWidth: this.segmentStrokeWidth,
                animationSteps: this.animationSteps,
                animationEasing: this.animationEasing,
                animateRotate: this.animateRotate,
                animateScale: this.animateScale
            });
        }
    }
}