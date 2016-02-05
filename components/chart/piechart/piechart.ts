/// <reference path="../../../typedefinition/chart.d.ts" />

import {Component, ElementRef, AfterViewInit, OnDestroy, OnChanges, SimpleChange, Input, Output, EventEmitter} from 'angular2/core';

@Component({
    selector: 'p-pieChart',
    template: `
        <canvas [attr.width]="width" [attr.height]="height"></canvas>
    `
})
export class PieChart implements AfterViewInit, OnDestroy, OnChanges {

    @Input() value: CircularChartData[];

    @Input() width: string;

    @Input() height: string;

    @Input() segmentShowStroke: boolean = true;

    @Input() segmentStrokeColor: string = '#fff';

    @Input() segmentStrokeWidth: number = 2;

    @Input() percentageInnerCutout: number = 0;

    @Input() animationSteps: number = 100;

    @Input() animationEasing: string = 'easeOutBounce';

    @Input() animateRotate: boolean = true;

    @Input() animateScale: boolean = false;

    @Input() legendTemplate: string = "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>";

    @Output() click: EventEmitter<any> = new EventEmitter();

    initialized: boolean;

    chart: any;

    constructor(private el: ElementRef) {
        this.initialized = false;
    }

    ngAfterViewInit() {
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

        this.el.nativeElement.children[0].onclick = (event) => {
            let segs = this.chart.getSegmentsAtEvent(event);
            if(segs && segs[0]) {
                this.click.next({originalEvent: event, segment: segs[0]});
            }
        };
    }

    ngOnChanges(changes: {[key: string]: SimpleChange}) {
        if (this.initialized) {
            for (var key in changes) {

            }
        }
    }

    ngOnDestroy() {
        if(this.chart) {
            this.chart.clear();
        }
    }
}