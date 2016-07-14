import {Component, ElementRef,AfterViewInit,OnDestroy,OnChanges,Input,Output,SimpleChange,EventEmitter,forwardRef,Provider} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

const SLIDER_VALUE_ACCESSOR: Provider = new Provider(NG_VALUE_ACCESSOR, {
    useExisting: forwardRef(() => Slider),
    multi: true
});

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
	
	@Input() limitedMin: number;
	
	@Input() limitedMax: number;

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

    constructor(private el: ElementRef) {
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
					if(ui.value > this.limitedMax){
						ui.value = this.limitedMax;
						jQuery(this.el.nativeElement.children[0]).slider("value", this.limitedMax);
						event.preventDefault();
					} else if (ui.value < this.limitedMin) {
						ui.value = this.limitedMin;
						jQuery(this.el.nativeElement.children[0]).slider("value", this.limitedMin);
						event.preventDefault();
					}
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
            let optionName = this.range ? 'values' : 'value';
            jQuery(this.el.nativeElement.children[0]).slider('option', optionName, this.value);                
        }
    }
    
    registerOnChange(fn: Function): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: Function): void {
        this.onModelTouched = fn;
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