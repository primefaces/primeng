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
        <div [ngStyle]="style" [class]="styleClass" [ngClass]="{'ui-slider ui-widget ui-widget-content ui-corner-all':true,'ui-state-disabled':disabled,
            'ui-slider-horizontal':orientation == 'horizontal','ui-slider-vertical':orientation == 'vertical','ui-slider-animate':animate}"
            (click)="onBarClick($event)">
            <span *ngIf="!range" class="ui-slider-handle ui-state-default ui-corner-all" (mousedown)="onMouseDown($event)" [style.transition]="dragging ? 'none': null"
                [ngStyle]="{'left': orientation == 'horizontal' ? handleValue + '%' : null,'bottom': orientation == 'vertical' ? handleValue + '%' : null}"></span>
            <span *ngIf="range" class="ui-slider-range ui-widget-header ui-corner-all" [ngStyle]="{'left':handleValues[0] + '%',width: (handleValues[1] - handleValues[0] + '%')}"></span>
            <span *ngIf="orientation=='vertical'" class="ui-slider-range ui-slider-range-min ui-widget-header ui-corner-all" [ngStyle]="{'height': handleValue + '%'}"></span>
            <span *ngIf="range" (mousedown)="onMouseDown($event,0)" [style.transition]="dragging ? 'none': null" class="ui-slider-handle ui-state-default ui-corner-all" [ngStyle]="{'left':handleValues[0] + '%'}"></span>
            <span *ngIf="range" (mousedown)="onMouseDown($event,1)" [style.transition]="dragging ? 'none': null" class="ui-slider-handle ui-state-default ui-corner-all" [ngStyle]="{'left':handleValues[1] + '%'}"></span>
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
    
    public value: number;
    
    public values: number;
    
    public handleValue: number;
    
    public handleValues: number[] = [];
        
    public onModelChange: Function = () => {};
    
    public onModelTouched: Function = () => {};
    
    public dragging: boolean;
    
    public dragListener: any;
    
    public mouseupListener: any;
        
    public initX: number;
    
    public initY: number;
    
    public barWidth: number;
    
    public barHeight: number;
    
    public sliderHandleClick: boolean;
    
    public handleIndex: number;
    
    constructor(public el: ElementRef, public domHandler: DomHandler, public renderer: Renderer) {}
    
    onMouseDown(event:Event,index?:number) {
        if(this.disabled) {
            return;
        }
        
        this.dragging = true;
        this.updateDomData();
        this.sliderHandleClick = true;
        this.handleIndex = index;
    }
    
    onBarClick(event) {
        if(this.disabled) {
            return;
        }
        
        if(!this.sliderHandleClick) {
            this.updateDomData();
            this.handleChange(event);
        }
        
        this.sliderHandleClick = false;
    }

    ngAfterViewInit() {
        if(this.disabled) {
            return;
        }
        
        this.dragListener = this.renderer.listenGlobal('body', 'mousemove', (event) => {
            if(this.dragging) {                                
                this.handleChange(event);
            }
        });
        
        this.mouseupListener = this.renderer.listenGlobal('body', 'mouseup', (event) => {
            if(this.dragging) {
                this.dragging = false;
                this.onSlideEnd.emit({originalEvent: event});
            }
        });
    }
    
    handleChange(event: Event) {
        let handleValue = this.calculateHandleValue(event);
        let newValue = this.getValueFromHandle(handleValue);
        
        if(this.range) {
            if(this.step) {
                this.handleStepChange(newValue, this.values[this.handleIndex]);
            }
            else {
                this.handleValues[this.handleIndex] = handleValue;          
                this.updateValue(newValue, event);
            }
        }
        else {            
            if(this.step) {
                this.handleStepChange(newValue, this.value);
            } 
            else {
                this.handleValue = handleValue;
                this.updateValue(newValue, event);
            }         
        }
    }
    
    handleStepChange(newValue: number, oldValue: number) {
        let diff = (newValue - oldValue);

        if(diff < 0 && (-1 * diff) >= this.step / 2) {
            newValue = oldValue - this.step;
            this.updateValue(newValue);
            this.updateHandleValue();
        }
        else if(diff > 0 && diff >= this.step / 2) {
            newValue = oldValue + this.step;
            this.updateValue(newValue);
            this.updateHandleValue();
        }
    }
    
    writeValue(value: any) : void {
        if(this.range)
            this.values = value||[0,0];
        else
            this.value = value||0;
        
        this.updateHandleValue();
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
    
    updateDomData(): void {
        let rect = this.el.nativeElement.children[0].getBoundingClientRect();
        this.initX = rect.left + this.domHandler.getWindowScrollLeft();
        this.initY = rect.top + this.domHandler.getWindowScrollTop();
        this.barWidth = this.el.nativeElement.children[0].offsetWidth;
        this.barHeight = this.el.nativeElement.children[0].offsetHeight;
    }
    
    calculateHandleValue(event): number {
        if(this.orientation === 'horizontal')
            return Math.floor(((event.pageX - this.initX) * 100) / (this.barWidth));
        else
            return Math.floor((((this.initY + this.barHeight) - event.pageY) * 100) / (this.barHeight));
    }
    
    updateHandleValue(): void {
        if(this.range) {
            this.handleValues[0] = (this.values[0] < this.min ? this.min : this.values[0]) * 100 / (this.max - this.min);
            this.handleValues[1] = (this.values[1] > this.max ? this.max : this.values[1]) * 100 / (this.max - this.min);
        }
        else {
            if(this.value < this.min)
                this.handleValue = this.min;
            else if(this.value > this.max)
                this.handleValue = this.max;
            else
                this.handleValue = this.value * 100 / (this.max - this.min);
        }
    }
    
    updateValue(val: number, event?: Event): void {
        if(this.range) {
            let value = val;
            
            if(this.handleIndex == 0) {
                if(value < this.min) {
                    value = this.min;
                    this.handleValues[0] = 0;
                }
                else if (value > this.values[1]) {
                    value = this.values[1];
                    this.handleValues[0] = this.values[1] * 100 / (this.max - this.min);
                }
            }
            else {
                if(value > this.max) {
                    value = this.max;
                    this.handleValues[1] = 100;
                }
                else if (value < this.values[0]) {
                    value = this.values[0];
                    this.handleValues[1] = this.values[0] * 100 / (this.max - this.min);
                }
            }
            
            this.values[this.handleIndex] = Math.floor(value);
            this.onModelChange(this.values);
            this.onChange.emit({event: event, values: this.values});
        }
        else {
            if(val < this.min) {
                val = this.min;
                this.handleValue = 0;
            }
            else if (val > this.max) {
                val = this.max;
                this.handleValue = 100;
            }
            
            this.value = Math.floor(val);
            this.onModelChange(this.value);
            this.onChange.emit({event: event, value: this.value});
        }
    }
            
    getValueFromHandle(handleValue: number): number {
        return (this.max - this.min) * (handleValue / 100);
    }
    
    ngOnDestroy() {
        if(this.dragListener) {
            this.dragListener();
        }
        
        if(this.mouseupListener) {
            this.mouseupListener();
        }
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [Slider],
    declarations: [Slider]
})
export class SliderModule { }