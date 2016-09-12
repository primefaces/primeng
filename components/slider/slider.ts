import {NgModule,Component, ElementRef,AfterViewInit,OnDestroy,OnChanges,Input,Output,SimpleChange,EventEmitter,forwardRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

export const SLIDER_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => Slider),
  multi: true
};

@Component({
    selector: 'p-slider',
    template: `
        <div [ngStyle]="style" [class]="styleClass"></div>
    `,
    providers: [SLIDER_VALUE_ACCESSOR]
})
export class Slider implements AfterViewInit,OnDestroy,OnChanges,ControlValueAccessor {

    @Input() animate: boolean;

    @Input() disabled: boolean;

    @Input() min: number;

    @Input() max: number;

    @Input() orientation: string;

    @Input() step: number;

    @Input() range: boolean;

    @Input() style: any;

    @Input() styleClass: string;

    @Output() onChange: EventEmitter<any> = new EventEmitter();
    
    @Output() onSlideEnd: EventEmitter<any> = new EventEmitter();
    
    value: any;
    
    onModelChange: Function = () => {};
    
    onModelTouched: Function = () => {};

    initialized: boolean;

    constructor(protected el: ElementRef) {
        this.initialized = false;
    }

    ngAfterViewInit() {
        jQuery(this.el.nativeElement.children[0]).slider({
            animate: this.animate,
            disabled: this.disabled,
            max: this.max,
            min: this.min,
            orientation: this.orientation,
            range: this.range,
            step: this.step,
            value: this.value,
            values: this.value,
            slide: (event: Event, ui: any) => {
                if(this.range) {
                    this.onModelChange(ui.values);
                    this.onChange.emit({originalEvent: event, values: ui.values});
                }
                else {
                    this.onModelChange(ui.value);
                    this.onChange.emit({originalEvent: event, value: ui.value});
                }
            },
            stop: (event: Event, ui: any) => {
                this.onSlideEnd.emit({originalEvent: event, value: ui.value});
            }
        });
        this.initialized = true;
    }
    
    writeValue(value: any) : void {
        this.value = value;
        
        if(this.initialized) {
            let sliderValue = this.value||0;
            let optionName = this.range ? 'values' : 'value';
            jQuery(this.el.nativeElement.children[0]).slider('option', optionName, sliderValue);                
        }
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

    ngOnChanges(changes: { [key: string]: SimpleChange }) {
        if (this.initialized) {
            for (var key in changes) {
                jQuery(this.el.nativeElement.children[0]).slider('option', key, changes[key].currentValue);
            }
        }
    }

    ngOnDestroy() {
        jQuery(this.el.nativeElement.children[0]).slider('destroy');
        this.initialized = false;
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [Slider],
    declarations: [Slider]
})
export class SliderModule { }