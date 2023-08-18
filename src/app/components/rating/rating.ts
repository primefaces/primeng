import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, EventEmitter, forwardRef, Input, NgModule, OnInit, Output, QueryList, TemplateRef, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { StarFillIcon } from 'primeng/icons/starfill';
import { StarIcon } from 'primeng/icons/star';
import { BanIcon } from 'primeng/icons/ban';
import { RatingRateEvent } from './rating.interface';
import { Nullable } from 'primeng/ts-helpers';

export const RATING_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Rating),
    multi: true
};
/**
 * RadioButton is an extension to standard radio button element with theming.
 * @group Components
 */
@Component({
    selector: 'p-rating',
    template: `
        <div class="p-rating" [ngClass]="{ 'p-readonly': readonly, 'p-disabled': disabled }">
            <ng-container *ngIf="!isCustomIcon; else customTemplate">
                <ng-container *ngIf="cancel">
                    <span
                        *ngIf="iconCancelClass"
                        [attr.tabindex]="disabled || readonly ? null : '0'"
                        (click)="clear($event)"
                        (keydown.enter)="clear($event)"
                        class="p-rating-icon p-rating-cancel"
                        [ngClass]="iconCancelClass"
                        [ngStyle]="iconCancelStyle"
                    ></span>
                    <BanIcon *ngIf="!iconCancelClass" [attr.tabindex]="disabled || readonly ? null : '0'" (click)="clear($event)" (keydown.enter)="clear($event)" [styleClass]="'p-rating-icon p-rating-cancel'" [ngStyle]="iconCancelStyle" />
                </ng-container>
                <span *ngFor="let star of starsArray; let i = index">
                    <ng-container *ngIf="!value || i >= value">
                        <span class="p-rating-icon" *ngIf="iconOffClass" [ngStyle]="iconOffStyle" [ngClass]="iconOffClass" (click)="rate($event, i)" (keydown.enter)="rate($event, i)"></span>
                        <StarIcon *ngIf="!iconOffClass" (click)="rate($event, i)" [ngStyle]="iconOffStyle" (keydown.enter)="rate($event, i)" [styleClass]="'p-rating-icon'" [attr.tabindex]="disabled || readonly ? null : '0'" />
                    </ng-container>
                    <ng-container *ngIf="value && i < value">
                        <span class="p-rating-icon p-rating-icon-active" *ngIf="iconOnClass" [ngStyle]="iconOnStyle" [ngClass]="iconOnClass" (click)="rate($event, i)" (keydown.enter)="rate($event, i)"></span>
                        <StarFillIcon *ngIf="!iconOnClass" (click)="rate($event, i)" [ngStyle]="iconOnStyle" (keydown.enter)="rate($event, i)" [styleClass]="'p-rating-icon p-rating-icon-active'" [attr.tabindex]="disabled || readonly ? null : '0'" />
                    </ng-container>
                </span>
            </ng-container>
            <ng-template #customTemplate>
                <span *ngIf="cancel" [attr.tabindex]="disabled || readonly ? null : '0'" (click)="clear($event)" (keydown.enter)="clear($event)" class="p-rating-icon p-rating-cancel" [ngStyle]="iconCancelStyle">
                    <ng-container *ngTemplateOutlet="cancelIconTemplate"></ng-container>
                </span>
                <span *ngFor="let star of starsArray; let i = index" class="p-rating-icon" [attr.tabindex]="disabled || readonly ? null : '0'" (click)="rate($event, i)" (keydown.enter)="rate($event, i)">
                    <ng-container *ngTemplateOutlet="getIconTemplate(i)"></ng-container>
                </span>
            </ng-template>
        </div>
    `,
    providers: [RATING_VALUE_ACCESSOR],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./rating.css'],
    host: {
        class: 'p-element'
    }
})
export class Rating implements OnInit, ControlValueAccessor {
    /**
     * When present, it specifies that the element should be disabled.
     * @group Props
     */
    @Input() disabled: boolean | undefined;
    /**
     * When present, changing the value is not possible.
     * @group Props
     */
    @Input() readonly: boolean | undefined;
    /**
     * Number of stars.
     * @group Props
     */
    @Input() stars: number = 5;
    /**
     * When specified a cancel icon is displayed to allow removing the value.
     * @group Props
     */
    @Input() cancel: boolean = true;
    /**
     * Style class of the on icon.
     * @group Props
     */
    @Input() iconOnClass: string | undefined;
    /**
     * Inline style of the on icon.
     * @group Props
     */
    @Input() iconOnStyle: { [klass: string]: any } | null | undefined;
    /**
     * Style class of the off icon.
     * @group Props
     */
    @Input() iconOffClass: string | undefined;
    /**
     * Inline style of the off icon.
     * @group Props
     */
    @Input() iconOffStyle: { [klass: string]: any } | null | undefined;
    /**
     * Style class of the cancel icon.
     * @group Props
     */
    @Input() iconCancelClass: string | undefined;
    /**
     * Inline style of the cancel icon.
     * @group Props
     */
    @Input() iconCancelStyle: { [klass: string]: any } | null | undefined;
    /**
     * Emitted on value change.
     * @param {RatingRateEvent} value - Custom rate event.
     * @group Emits
     */
    @Output() onRate: EventEmitter<RatingRateEvent> = new EventEmitter<RatingRateEvent>();
    /**
     * Emitted when the rating is cancelled.
     * @param {Event} value - Browser event.
     * @group Emits
     */
    @Output() onCancel: EventEmitter<Event> = new EventEmitter<Event>();

    @ContentChildren(PrimeTemplate) templates!: QueryList<PrimeTemplate>;

    onIconTemplate: Nullable<TemplateRef<any>>;

    offIconTemplate: Nullable<TemplateRef<any>>;

    cancelIconTemplate: Nullable<TemplateRef<any>>;

    constructor(private cd: ChangeDetectorRef) {}

    value: Nullable<number>;

    onModelChange: Function = () => {};

    onModelTouched: Function = () => {};

    public starsArray: Nullable<number[]>;

    ngOnInit() {
        this.starsArray = [];
        for (let i = 0; i < this.stars; i++) {
            this.starsArray[i] = i;
        }
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'onicon':
                    this.onIconTemplate = item.template;
                    break;

                case 'officon':
                    this.offIconTemplate = item.template;
                    break;

                case 'cancelicon':
                    this.cancelIconTemplate = item.template;
                    break;
            }
        });
    }

    getIconTemplate(i: number): Nullable<TemplateRef<any>> {
        return !this.value || i >= this.value ? this.offIconTemplate : this.onIconTemplate;
    }

    rate(event: Event, i: number): void {
        if (!this.readonly && !this.disabled) {
            this.value = i + 1;
            this.onModelChange(this.value);
            this.onModelTouched();
            this.onRate.emit({
                originalEvent: event,
                value: i + 1
            });
        }
        event.preventDefault();
    }

    clear(event: Event): void {
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
        this.cd.markForCheck();
    }

    get isCustomIcon(): boolean {
        return this.templates && this.templates.length > 0;
    }
}

@NgModule({
    imports: [CommonModule, StarFillIcon, StarIcon, BanIcon],
    exports: [Rating, SharedModule],
    declarations: [Rating]
})
export class RatingModule {}
