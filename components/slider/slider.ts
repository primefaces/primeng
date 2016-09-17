import {NgModule,Component, ElementRef,AfterViewInit,OnDestroy,Input,Output,SimpleChange,EventEmitter,forwardRef,Renderer} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DomHandler} from '../dom/domhandler';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

export const SLIDER_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => Slider),
  multi: true
};

@Component({
    selector: 'p-slider',
    template: `
        <div [ngStyle]="style" [class]="styleClass" [ngClass]="{'ui-slider ui-widget ui-widget-content ui-corner-all':true,
            'ui-slider-horizontal':orientation == 'horizontal','ui-slider-vertical':orientation == 'vertical','ui-slider-animate':animate}"
            (click)="onBarClick($event)">
            <span *ngIf="!range" class="ui-slider-handle ui-state-default ui-corner-all" (mousedown)="onMouseDown($event)" [style.transition]="dragging ? 'none': null"
                [ngStyle]="{'left': orientation == 'horizontal' ? value + '%' : null,'bottom': orientation == 'vertical' ? value + '%' : null}"></span>
            <span *ngIf="range" class="ui-slider-range ui-widget-header ui-corner-all" [ngStyle]="{'left':values[0] + '%',width: (values[1] - values[0] + '%')}"></span>
            <span *ngIf="range" (mousedown)="onMouseDown($event,0)" [style.transition]="dragging ? 'none': null" class="ui-slider-handle ui-state-default ui-corner-all" [ngStyle]="{'left':values[0] + '%'}"></span>
            <span *ngIf="range" (mousedown)="onMouseDown($event,1)" [style.transition]="dragging ? 'none': null" class="ui-slider-handle ui-state-default ui-corner-all" [ngStyle]="{'left':values[1] + '%'}"></span>
        </div>
    `,
    providers: [SLIDER_VALUE_ACCESSOR,DomHandler]
})
export class Slider implements AfterViewInit,OnDestroy,ControlValueAccessor {

    @Input() animate: boolean;

    @Input() disabled: boolean;

    @Input() min: number = 0;

    @Input() max: number = 100;

    @Input() orientation: string = 'horizontal';

    @Input() step: number;

    @Input() range: boolean;

    @Input() style: any;

    @Input() styleClass: string;

    @Output() onChange: EventEmitter<any> = new EventEmitter();
    
    @Output() onSlideEnd: EventEmitter<any> = new EventEmitter();
    
    protected value: number;
    
    protected values: number;
    
    protected handleValue: number;
        
    protected onModelChange: Function = () => {};
    
    protected onModelTouched: Function = () => {};
    
    protected dragging: boolean;
    
    protected dragListener: any;
    
    protected mouseupListener: any;
        
    protected initX: number;
    
    protected initY: number;
    
    protected barWidth: number;
    
    protected barHeight: number;
    
    protected sliderHandleClick: boolean;
    
    protected handleIndex: number;
    
    constructor(protected el: ElementRef, protected domHandler: DomHandler, protected renderer: Renderer) {}
    
    onMouseDown(event:Event,index?:number) {
        this.dragging = true;
        let rect = this.el.nativeElement.children[0].getBoundingClientRect();
        this.initX = rect.left + this.domHandler.getWindowScrollLeft();
        this.initY = rect.top + + this.domHandler.getWindowScrollTop();
        this.barWidth = this.el.nativeElement.children[0].offsetWidth;
        this.barHeight = this.el.nativeElement.children[0].offsetHeight;
        this.sliderHandleClick = true;
        this.handleIndex = index;
    }
    
    onBarClick(event) {
        if(!this.sliderHandleClick) {
            this.value = this.calculateValue(event);
            this.onModelChange(Math.floor(this.value));
        }
        
        this.sliderHandleClick = false;
    }

    ngAfterViewInit() {
        this.dragListener = this.renderer.listenGlobal('body', 'mousemove', (event) => {
            if(this.dragging) {
                let value = this.calculateValue(event);
                let otherHandleIndex = this.handleIndex == 0 ? 1 : 0;
                                
                if(this.range) {
                    if(this.handleIndex == 0) {
                        if(value < this.min)
                            value = this.min;
                        else if (value > this.values[1])
                            value = this.values[1];
                    }
                    else {
                        if(value > this.max)
                            value = this.max;
                        else if (value < this.values[0])
                            value = this.values[0];
                    }
                        
                    this.values[this.handleIndex] = value;
                    this.onModelChange(this.values);
                    this.onChange.emit({event: event, values: this.values});
                }
                else {
                    if(this.orientation == 'horizontal') {
                        if(value < this.min)
                            value = this.min;
                        else if (value > this.max)
                            value = this.max;
                    } 
                    else {
                        if(event.pageY < this.initY)
                            value = this.max;
                        else if (event.pageY > (this.initY + this.barHeight))
                            value = this.min;
                    }
                    
                    this.value = value
                    this.onModelChange(Math.floor(this.value));
                    this.onChange.emit({event: event, value: this.value});
                }
            }
        });
        
        this.mouseupListener = this.renderer.listenGlobal('body', 'mouseup', (event) => {
            if(this.dragging) {
                this.dragging = false;
                this.onSlideEnd.emit({event: event});
            }
        });
    }
    
    calculateValue(event): number {
        if(this.orientation === 'horizontal')
            return Math.floor(((event.pageX - this.initX) * 100) / (this.barWidth));
        else
            return Math.floor((((this.initY + this.barHeight) - event.pageY) * 100) / (this.barHeight));
    }
    
    writeValue(value: any) : void {
        if(this.range)
            this.values = value||[0,0];
        else
            this.value = value||0;
    }
    
    registerOnChange(fn: Function): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: Function): void {
        this.onModelTouched = fn;
    }
    
    setDisabledState(val: boolean): void {
        this.disabled = val;
    }

    ngOnDestroy() {
        this.dragListener();
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [Slider],
    declarations: [Slider]
})
export class SliderModule { }