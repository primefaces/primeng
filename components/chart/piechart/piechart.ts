import {Component, ElementRef, AfterViewInit, OnDestroy, DoCheck, SimpleChange, Input, Output, EventEmitter, IterableDiffers} from '@angular/core';

@Component({
    selector: 'p-pieChart',
    template: `
        <div>
            <canvas [attr.width]="width" [attr.height]="height" (click)="onCanvasClick($event)"></canvas>
        </div>
    `
})
export class PieChart implements AfterViewInit, OnDestroy, DoCheck {

    @Input() animation: boolean = true;

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

    @Input() scaleBeginAtZero: boolean = false;

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

    @Input() value: any[];

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

    @Input() legend: any;

    @Input() legendTemplate: string = "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>";

    @Output() onSegmentsSelect: EventEmitter<any> = new EventEmitter();

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
                this.onSegmentsSelect.emit({originalEvent: event, segments: segs});
            }
        }
    }

    initChart() {
        if(this.value) {
            this.chart = new Chart(this.el.nativeElement.children[0].children[0].getContext("2d")).Pie(this.value, {
                animation: this.animation,
                showScale: this.showScale,
                scaleOverride: this.scaleOverride,
                scaleSteps: this.scaleSteps,
                scaleStepWidth: this.scaleStepWidth,
                scaleStartValue: this.scaleStartValue,
                scaleLineColor: this.scaleLineColor,
                scaleLineWidth: this.scaleLineWidth,
                scaleLabel: this.scaleLabel,
                scaleShowLabels: this.scaleShowLabels,
                scaleIntegersOnly: this.scaleIntegersOnly,
                scaleBeginAtZero: this.scaleBeginAtZero,
                scaleFontFamily: this.scaleFontFamily,
                scaleFontSize: this.scaleFontSize,
                scaleFontStyle: this.scaleFontStyle,
                scaleFontColor: this.scaleFontColor,
                responsive: this.responsive,
                maintainAspectRatio: this.maintainAspectRatio,
                showTooltips: this.showTooltips,
                tooltipFillColor: this.tooltipFillColor,
                tooltipFontFamily: this.tooltipFontFamily,
                tooltipFontSize: this.tooltipFontSize,
                tooltipFontStyle: this.tooltipFontStyle,
                tooltipFontColor: this.tooltipFontColor,
                tooltipTitleFontFamily: this.tooltipTitleFontFamily,
                tooltipTitleFontSize: this.tooltipTitleFontSize,
                tooltipTitleFontStyle: this.tooltipTitleFontStyle,
                tooltipTitleFontColor: this.tooltipTitleFontColor,
                tooltipYPadding: this.tooltipYPadding,
                tooltipXPadding: this.tooltipXPadding,
                tooltipCaretSize: this.tooltipCaretSize,
                tooltipCornerRadius: this.tooltipCornerRadius,
                tooltipXOffset: this.tooltipXOffset,
                tooltipTemplate: this.tooltipTemplate,
                multiTooltipTemplate: this.multiTooltipTemplate,
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

            if(this.legend) {
                this.legend.innerHTML = this.chart.generateLegend();
            }
        }
    }
    
    getCanvas() {
        return this.el.nativeElement.children[0].children[0];
    }
    
    getBase64Image() {
        return this.chart.toBase64Image();
    }
}