import {NgModule,Component,OnInit,Input,Output,EventEmitter,forwardRef,ChangeDetectorRef,ChangeDetectionStrategy, ViewEncapsulation, TemplateRef, QueryList, ContentChildren} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';
import { PrimeTemplate, SharedModule } from '../api/shared';

export const RATING_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => Rating),
  multi: true
};

@Component({
    selector: 'p-rating',
    template: `
        <ng-container *ngIf="!isCustomIcon;else customTemplate">
            <div class="p-rating" [ngClass]="{'p-readonly': readonly, 'p-disabled': disabled}">
                <span [attr.tabindex]="(disabled || readonly) ? null : '0'" *ngIf="cancel" (click)="clear($event)" (keydown.enter)="clear($event)" class="p-rating-icon p-rating-cancel" [ngClass]="iconCancelClass" [ngStyle]="iconCancelStyle"></span>
                <span *ngFor="let star of starsArray;let i=index" class="p-rating-icon" [attr.tabindex]="(disabled || readonly) ? null : '0'"  (click)="rate($event,i)" (keydown.enter)="rate($event,i)"
                [ngClass]="(!value || i >= value) ? iconOffClass : iconOnClass"
                [ngStyle]="(!value || i >= value) ? iconOffStyle : iconOnStyle">
                </span>
            </div>
        </ng-container>
        <ng-template #customTemplate>
            <a *ngIf="isCustomCancelIcon" (click)="clearCustomIcons()" (keydown.enter)="clearCustomIcons()"  class="p-rating-icon p-rating-cancel" [ngStyle]="iconCancelStyle">
                <ng-container *ngTemplateOutlet="cancelIconTemplate"></ng-container>
            </a>
            <a *ngFor="let star of starsArray;let i=index" (click)="setIndex(i == undefined ? 0 : i)" [attr.tabindex]="(disabled || readonly) ? null : '0'" class="p-rating-icon" >
                <ng-container *ngTemplateOutlet="getIconSrc(i)"></ng-container>
            </a>
        </ng-template>
    `,
    providers: [RATING_VALUE_ACCESSOR],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./rating.css'],
    host: {
        'class': 'p-element'
    }
})
export class Rating implements OnInit, ControlValueAccessor {

    @Input() isCustomIcon: boolean = false;

    @ContentChildren(PrimeTemplate) templates: QueryList<any>;

    onIconTemplate: TemplateRef<any>;

    offIconTemplate: TemplateRef<any>;

    cancelIconTemplate: TemplateRef<any>;

    @Input() isCustomCancelIcon: boolean = true;

    @Input() index: number;

    @Input() disabled: boolean;

    @Input() readonly: boolean;

    @Input() stars: number = 5;

    @Input() cancel: boolean = true;

    @Input() iconOnClass: string = 'pi pi-star-fill';

    @Input() iconOnStyle: any;

    @Input() iconOffClass: string = 'pi pi-star';

    @Input() iconOffStyle: any;

    @Input() iconCancelClass: string = 'pi pi-ban';

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
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch(item.getType()) {
                case 'onicon':
                    this.onIconTemplate = item.template;
                break;

                case 'officon':
                    this.offIconTemplate = item.template;
                break;

                case 'cancel':
                    this.cancelIconTemplate = item.template;
                break;
            }
        });
    }

    setIndex(i: number) {
        this.index = i;
    }

    clearCustomIcons() {
        this.index = undefined;
    }

    getIconSrc(i: number) {
        if(this.index >= i) {
            return this.onIconTemplate;
        } else {
            return this.offIconTemplate;
        }
    }

    rate(event, i: number): void {
        if (!this.readonly&&!this.disabled) {
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
        if (!this.readonly&&!this.disabled) {
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
        this.cd.markForCheck();
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [Rating, SharedModule],
    declarations: [Rating]
})
export class RatingModule { }
