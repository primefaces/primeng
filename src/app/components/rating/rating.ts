import {NgModule,Component,ElementRef,OnInit,Input,Output,EventEmitter,forwardRef,ChangeDetectorRef} from '@angular/core';
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
            <a href="#" *ngIf="cancel" (click)="clear($event)" class="ui-rating-cancel">
                <span class="ui-rating-icon fa" [ngClass]="iconCancelClass" [ngStyle]="iconCancelStyle"></span>
            </a>
            <a href="#" *ngFor="let star of starsArray;let i=index" (click)="rate($event,i)">
                <span class="ui-rating-icon fa" 
                    [ngClass]="(!value || i >= value) ? iconOffClass : iconOnClass"
                    [ngStyle]="(!value || i >= value) ? iconOffStyle : iconOnStyle"
                ></span>
            </a>
        </div>
    `,
    providers: [RATING_VALUE_ACCESSOR]
})
export class Rating implements ControlValueAccessor {

    @Input() disabled: boolean;

    @Input() readonly: boolean;

    @Input() stars: number = 5;

    @Input() cancel: boolean = true;

    @Input() iconOnClass: string = 'fa-star';

    @Input() iconOnStyle: any;

    @Input() iconOffClass: string = 'fa-star-o';

    @Input() iconOffStyle: any;

    @Input() iconCancelClass: string = 'fa-ban';

    @Input() iconCancelStyle: any;

    @Output() onRate: EventEmitter<any> = new EventEmitter();

    @Output() onCancel: EventEmitter<any> = new EventEmitter();

    constructor(private cd: ChangeDetectorRef) {} 
    
    value: number;
    
    onModelChange: Function = () => {};
    
    onModelTouched: Function = () => {};
    
    public starsArray: number[];
    
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
        event.preventDefault();        
    }
    
    clear(event): void {
        if(!this.readonly&&!this.disabled) {
            this.value = null;
            this.onModelChange(this.value);
            this.onModelTouched();
            this.onCancel.emit(event);
        }
        event.preventDefault();
    }
    
    writeValue(value: any) : void {
        this.value = value;
        this.cd.detectChanges();
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