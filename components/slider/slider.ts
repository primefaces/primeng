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
            <span class="ui-slider-handle ui-state-default ui-corner-all" (mousedown)="onMouseDown($event)" [style.transition]="dragging ? 'none': null"
                [ngStyle]="{'left': orientation == 'horizontal' ? value + '%' : null,'bottom': orientation == 'vertical' ? value + '%' : null}"></span>
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
    
    constructor(protected el: ElementRef, protected domHandler: DomHandler, protected renderer: Renderer) {}
    
    onMouseDown(event) {
        this.dragging = true;
        let rect = this.el.nativeElement.children[0].getBoundingClientRect();
        this.initX = rect.left + this.domHandler.getWindowScrollLeft();
        this.initY = rect.top + + this.domHandler.getWindowScrollTop();
        this.barWidth = this.el.nativeElement.children[0].offsetWidth;
        this.barHeight = this.el.nativeElement.children[0].offsetHeight;
        this.sliderHandleClick = true;
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
                                
                if(this.orientation == 'horizontal') {
                    if(event.pageX < this.initX)
                        value = this.min;
                    else if (event.pageX > (this.initX + this.barWidth))
                        value = this.max;
                } 
                else {
                    if(event.pageY < this.initY)
                        value = this.max;
                    else if (event.pageY > (this.initY + this.barHeight))
                        value = this.min;
                }
                
                this.value = value;
                this.onModelChange(Math.floor(this.value));
            }
        });
        
        this.mouseupListener = this.renderer.listenGlobal('body', 'mouseup', (event) => {
            if(this.dragging) {
                this.dragging = false;
            }
        });
    }
    
    calculateValue(event): number {
        if(this.orientation === 'horizontal')
            return ((event.pageX - this.initX) * 100) / (this.barWidth);
        else
            return (((this.initY + this.barHeight) - event.pageY) * 100) / (this.barHeight);
    }
    
    writeValue(value: any) : void {
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