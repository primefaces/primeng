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
            <a [attr.tabindex]="disabled ? null : '0'" *ngIf="cancel" (click)="clear($event)" (keydown.enter)="clear($event)"  class="ui-rating-cancel">
                <span class="ui-rating-icon" [ngClass]="iconCancelClass" [ngStyle]="iconCancelStyle"></span>
            </a>
            <a [attr.tabindex]="disabled ? null : '0'" *ngFor="let star of starsArray;let i = index" (click)="rate($event,i)" (keydown.enter)="rate($event,i)">
                <span class="ui-rating-icon empty-icon">
                    <span class="filled-icon" [style.width.%]="iconShown(i)">
                        <i [ngClass]="iconOnClass" [ngStyle]="iconOnStyle" aria-hidden="true"></i>
                    </span>
                    <i [ngClass]="iconOffClass" [ngStyle]="iconOffStyle" aria-hidden="true"></i>
                </span>
            </a>
        </div>
    `,
    providers: [RATING_VALUE_ACCESSOR]
})
export class Rating implements ControlValueAccessor, OnInit {

    public starsArray: number[];

    @Input() disabled: boolean;

    @Input() readonly: boolean;

    @Input() stars: number = 5;

    @Input() halfRating: boolean;

    @Input() cancel: boolean = true;

    @Input() iconOnClass: string = 'pi pi-star';

    @Input() iconOnStyle: any;

    @Input() iconOffClass: string = 'pi pi-star-o';

    @Input() iconOffStyle: any;

    @Input() iconCancelClass: string = 'pi pi-ban';

    @Input() iconCancelStyle: any;

    @Output() onRate: EventEmitter<any> = new EventEmitter();

    @Output() onCancel: EventEmitter<any> = new EventEmitter();

    value: number;

    onModelChange: Function = () => {};

    onModelTouched: Function = () => {};

    constructor(private cd: ChangeDetectorRef) { }

    ngOnInit(): void {
        this.starsArray = [];
        for (let i = 0; i < this.stars; i++) {
            this.starsArray[i] = i;
        }
    }

    rate(event: any, i: number): void {
        if (!this.readonly && !this.disabled) {
            this.value = (i + 1);

            if (this.halfRating && event.offsetX <= (event.target.offsetWidth / 2)) {
                this.value = (this.value - 0.5);
            }

            this.onModelChange(this.value);
            this.onModelTouched();
            this.onRate.emit({
                originalEvent: event,
                value: (i + 1)
            });
        }
        event.preventDefault();
    }

    iconShown(i: number): number {
        const iconIndex: number = (i + 1);
        if (this.value >= iconIndex) {
            return 100;
        }
        else if (this.halfRating && (iconIndex - 0.5) === this.value && this.value < iconIndex) {
            return 50;
        }
        else {
            return 0;
        }
    }

    clear(event: any): void {
        if (!this.readonly && !this.disabled) {
            this.value = null;
            this.onModelChange(this.value);
            this.onModelTouched();
            this.onCancel.emit(event);
        }
        event.preventDefault();
    }

    writeValue(value: any): void {
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
