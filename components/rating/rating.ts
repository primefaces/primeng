import {NgModule,Component,ElementRef,OnInit,Input,Output,EventEmitter,forwardRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

export const RATING_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => Rating),
  multi: true
};

@Component({
    selector: 'p-rating',
    template: `
        <div class="ui-rating" [ngClass]="{'ui-state-disabled': disabled}">
            <div class="ui-rating-cancel" *ngIf="cancel" (click)="clear($event)" [ngClass]="{'ui-rating-cancel-hover':hoverCancel}"
             (mouseenter)="hoverCancel=true" (mouseleave)="hoverCancel=false"><a></a></div>
            <div class="ui-rating-star" *ngFor="let star of starsArray;let i=index" (click)="rate($event,i)"
             [ngClass]="{'ui-rating-star-on':(i < value)}"><a></a></div>
        </div>
    `,
    providers: [RATING_VALUE_ACCESSOR]
})
export class Rating implements ControlValueAccessor {

    @Input() disabled: boolean;

    @Input() readonly: boolean;

    @Input() stars: number = 5;

    @Input() cancel: boolean = true;

    @Output() onRate: EventEmitter<any> = new EventEmitter();

    @Output() onCancel: EventEmitter<any> = new EventEmitter();
    
    value: number;
    
    onModelChange: Function = () => {};
    
    onModelTouched: Function = () => {};
    
    protected starsArray: number[];
    
    protected hoverCancel: boolean;

    ngOnInit() {
        this.starsArray = [];
        for(let i = 0; i < this.stars; i++) {
            this.starsArray[i] = i;
        }
    }
    
    rate(event, i: number): void {
        if(!this.readonly&&!this.disabled) {
            this.value = (i + 1);
            this.onModelChange(this.value);
            this.onModelTouched();
            this.onRate.emit({
                originalEvent: event,
                value: (i+1)
            });
        }        
    }
    
    clear(event): void {
        if(!this.readonly&&!this.disabled) {
            this.value = null;
            this.onModelChange(this.value);
            this.onModelTouched();
            this.onCancel.emit(event);
        }
    }
    
    writeValue(value: any) : void {
        this.value = value;
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
}

@NgModule({
    imports: [CommonModule],
    exports: [Rating],
    declarations: [Rating]
})
export class RatingModule { }