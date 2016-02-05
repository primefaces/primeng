/// <reference path="../../../typedefinition/chart.d.ts" />

import {Component, ElementRef, AfterViewInit, OnDestroy, DoCheck, SimpleChange, Input, Output, EventEmitter, IterableDiffers} from 'angular2/core';

@Component({
    selector: 'p-doughnutChart',
    template: `
        <canvas [attr.width]="width" [attr.height]="height"></canvas>
    `
})
export class DoughnutChart implements AfterViewInit, OnDestroy, DoCheck {

    @Input() value: CircularChartData[];

    @Input() width: string;

    @Input() height: string;

    @Input() segmentShowStroke: boolean = true;

    @Input() segmentStrokeColor: string = '#fff';

    @Input() segmentStrokeWidth: number = 2;

    @Input() percentageInnerCutout: number = 50;

    @Input() animationSteps: number = 100;

    @Input() animationEasing: string = 'easeOutBounce';

    @Input() animateRotate: boolean = true;

    @Input() animateScale: boolean = false;

    @Input() legendTemplate: string = "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>";

    @Output() onSegmentSelect: EventEmitter<any> = new EventEmitter();

    initialized: boolean;

    chart: any;

    differ: any;

    constructor(private el: ElementRef, differs: IterableDiffers) {
        this.initialized = false;
        this.differ = differs.find([]).create(null);
    }

    ngAfterViewInit() {
        this.initChart();

        this.el.nativeElement.children[0].onclick = (event) => {
            let segs = this.chart.getSegmentsAtEvent(event);
            if(segs && segs[0]) {
                this.onSegmentSelect.next({originalEvent: event, segment: segs[0]});
            }
            else {
                console.log('no seg');
            }
        };
    }

    ngDoCheck() {
        var changes = this.differ.diff(this.value);
        if (changes && this.chart) {
            this.chart.destroy();
            this.initChart();
        }
    }

    ngOnDestroy() {
        if(this.chart) {
            this.chart.destroy();
        }
    }

    initChart() {
        this.chart = new Chart(this.el.nativeElement.children[0].getContext("2d")).Pie(this.value, {
            segmentShowStroke: this.segmentShowStroke,
            segmentStrokeColor: this.segmentStrokeColor,
            segmentStrokeWidth: this.segmentStrokeWidth,
            percentageInnerCutout: this.percentageInnerCutout,
            animationSteps: this.animationSteps,
            animationEasing: this.animationEasing,
            animateRotate: this.animateRotate,
            animateScale: this.animateScale,
            legendTemplate: this.legendTemplate
        });
    }
}