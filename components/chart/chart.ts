import {Component,ElementRef,AfterViewInit,OnDestroy,DoCheck,Input,Output,EventEmitter,IterableDiffers} from '@angular/core';

declare var Chart: any;

@Component({
    selector: 'p-chart',
    template: `
        <div>
            <canvas [attr.width]="width" [attr.height]="height" (click)="onCanvasClick($event)"></canvas>
        </div>
    `
})
export class UIChart implements AfterViewInit, OnDestroy, DoCheck {

    @Input() type: string;

    @Input() data: any;

    @Input() options: any;
    
    @Input() width: string;
    
    @Input() height: string;
    
    @Output() onDataSelect: EventEmitter<any> = new EventEmitter();

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
        var changes = this.differ.diff(this.data.datasets);
        if (changes && this.initialized) {
            if(this.chart) {
                this.chart.destroy();
            }

            this.initChart();
        }
    }

    onCanvasClick(event) {
        if(this.chart) {
            let elements = this.chart.getElementsAtEvent(event);
            if(elements) {
                this.onDataSelect.emit({originalEvent: event, elements: elements});
            }
        }
    }

    initChart() {
        this.chart = new Chart(this.el.nativeElement.children[0].children[0], {
            type: this.type,
            data: this.data,
            options: this.options
        });
    }
    
    getCanvas() {
        return this.el.nativeElement.children[0].children[0];
    }
    
    getBase64Image() {
        return this.chart.toBase64Image();
    }
    
    ngOnDestroy() {
        if(this.chart) {
            this.chart.destroy();
            this.initialized = false;
            this.chart = null;
        }
    }
}