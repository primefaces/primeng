import { NgClass, NgStyle, NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, ContentChild, EventEmitter, forwardRef, inject, Input, NgModule, numberAttribute, OnInit, Output, signal, TemplateRef, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { focus, getFirstFocusableElement, uuid } from '@primeuix/utils';
import { SharedModule } from 'primeng/api';
import { AutoFocus } from 'primeng/autofocus';
import { BaseComponent } from 'primeng/basecomponent';
import { BanIcon, StarFillIcon, StarIcon } from 'primeng/icons';
import { Nullable } from 'primeng/ts-helpers';
import { RatingRateEvent } from './rating.interface';
import { RatingStyle } from './style/ratingstyle';

export const RATING_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Rating),
    multi: true
};
/**
 * Rating is an extension to standard radio button element with theming.
 * @group Components
 */
@Component({
    selector: 'p-rating',
    imports: [NgClass, NgStyle, NgTemplateOutlet, AutoFocus, StarFillIcon, StarIcon, BanIcon, SharedModule],
    template: `
        @if (!isCustomIcon) {
            @for (star of starsArray; track star; let i = $index) {
                <div
                    class="p-rating-option"
                    [ngClass]="{
                        'p-rating-option-active': star + 1 <= value,
                        'p-focus-visible': star + 1 === focusedOptionIndex() && isFocusVisibleItem
                    }"
                    (click)="onOptionClick($event, star + 1)"
                >
                    <span class="p-hidden-accessible" [attr.data-p-hidden-accessible]="true">
                        <input
                            type="radio"
                            value="0"
                            [name]="nameattr"
                            [checked]="value === 0"
                            [disabled]="disabled"
                            [readonly]="readonly"
                            [attr.aria-label]="starAriaLabel(star + 1)"
                            (focus)="onInputFocus($event, star + 1)"
                            (blur)="onInputBlur($event)"
                            (change)="onChange($event, star + 1)"
                            [pAutoFocus]="autofocus"
                        />
                    </span>
                    @if (!value || i >= value) {
                        @if (iconOffClass) {
                            <span class="p-rating-icon" [ngStyle]="iconOffStyle" [ngClass]="iconOffClass" [attr.data-pc-section]="'offIcon'"></span>
                        }
                        @if (!iconOffClass) {
                            <StarIcon [ngStyle]="iconOffStyle" [styleClass]="'p-rating-icon'" [attr.data-pc-section]="'offIcon'" />
                        }
                    }
                    @if (value && i < value) {
                        @if (iconOnClass) {
                            <span class="p-rating-icon p-rating-icon-active" [ngStyle]="iconOnStyle" [ngClass]="iconOnClass" [attr.data-pc-section]="'onIcon'"></span>
                        }
                        @if (!iconOnClass) {
                            <StarFillIcon [ngStyle]="iconOnStyle" [styleClass]="'p-rating-icon p-rating-icon-active'" [attr.data-pc-section]="'onIcon'" />
                        }
                    }
                </div>
            }
        } @else {
            @for (star of starsArray; track star; let i = $index) {
                <span (click)="onOptionClick($event, star + 1)" [attr.data-pc-section]="'onIcon'">
                    <ng-container *ngTemplateOutlet="getIconTemplate(i)"></ng-container>
                </span>
            }
        }
    `,
    providers: [RATING_VALUE_ACCESSOR, RatingStyle],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'p-rating',
        '[attr.data-pc-name]': '"rating"',
        '[attr.data-pc-section]': '"root"',
        '[class.p-readonly]': 'readonly',
        '[class.p-disabled]': 'disabled'
    }
})
export class Rating extends BaseComponent implements OnInit, ControlValueAccessor {
    /**
     * When present, it specifies that the element should be disabled.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) disabled: boolean | undefined;
    /**
     * When present, changing the value is not possible.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) readonly: boolean | undefined;
    /**
     * Number of stars.
     * @group Props
     */
    @Input({ transform: numberAttribute }) stars: number = 5;
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
     * When present, it specifies that the component should automatically get focus on load.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) autofocus: boolean | undefined;
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
    /**
     * Emitted when the rating receives focus.
     * @param {Event} value - Browser event.
     * @group Emits
     */
    @Output() onFocus: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
    /**
     * Emitted when the rating loses focus.
     * @param {Event} value - Browser event.
     * @group Emits
     */
    @Output() onBlur: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
    /**
     * Custom on icon template.
     * @group Templates
     */
    @ContentChild('onicon') oniconTemplate: Nullable<TemplateRef<any>>;
    /**
     * Custom off icon template.
     * @group Templates
     */
    @ContentChild('officon') officonTemplate: Nullable<TemplateRef<any>>;
    /**
     * Custom cancel icon template.
     * @group Templates
     */
    @ContentChild('cancelicon') canceliconTemplate: Nullable<TemplateRef<any>>;

    value: Nullable<number>;

    onModelChange: Function = () => {};

    onModelTouched: Function = () => {};

    public starsArray: Nullable<number[]>;

    isFocusVisibleItem: boolean = true;

    focusedOptionIndex = signal<number>(-1);

    nameattr: string | undefined;

    _componentStyle = inject(RatingStyle);

    ngOnInit() {
        super.ngOnInit();
        this.nameattr = this.nameattr || uuid('pn_id_');
        this.starsArray = [];
        for (let i = 0; i < this.stars; i++) {
            this.starsArray[i] = i;
        }
    }

    onOptionClick(event, value) {
        if (!this.readonly && !this.disabled) {
            this.onOptionSelect(event, value);
            this.isFocusVisibleItem = false;
            const firstFocusableEl = <any>getFirstFocusableElement(event.currentTarget, '');

            firstFocusableEl && focus(firstFocusableEl);
        }
    }

    onOptionSelect(event, value) {
        if (this.focusedOptionIndex === value || value === this.value) {
            this.focusedOptionIndex.set(-1);
            this.updateModel(event, null);
        } else {
            this.focusedOptionIndex.set(value);
            this.updateModel(event, value || null);
        }
    }

    onChange(event, value) {
        this.onOptionSelect(event, value);
        this.isFocusVisibleItem = true;
    }

    onInputBlur(event) {
        this.focusedOptionIndex.set(-1);
        this.onBlur.emit(event);
    }

    onInputFocus(event, value) {
        this.focusedOptionIndex.set(value);
        this.onFocus.emit(event);
    }

    updateModel(event, value) {
        this.value = value;
        this.onModelChange(this.value);
        this.onModelTouched();

        if (!value) {
            this.onCancel.emit();
        } else {
            this.onRate.emit({
                originalEvent: event,
                value
            });
        }
    }

    starAriaLabel(value) {
        return value === 1 ? this.config.translation.aria.star : this.config.translation.aria.stars.replace(/{star}/g, value);
    }

    getIconTemplate(i: number): Nullable<TemplateRef<any>> {
        return !this.value || i >= this.value ? this.officonTemplate : this.oniconTemplate;
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
        return !!(this.oniconTemplate || this.officonTemplate || this.canceliconTemplate);
    }
}

@NgModule({
    imports: [Rating, SharedModule],
    exports: [Rating, SharedModule]
})
export class RatingModule {}
