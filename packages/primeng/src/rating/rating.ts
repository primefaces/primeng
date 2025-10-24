import { CommonModule } from '@angular/common';
import {
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    ContentChildren,
    EventEmitter,
    forwardRef,
    inject,
    InjectionToken,
    Input,
    NgModule,
    numberAttribute,
    OnInit,
    Output,
    QueryList,
    signal,
    TemplateRef,
    ViewEncapsulation
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { focus, getFirstFocusableElement, uuid } from '@primeuix/utils';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { AutoFocus } from 'primeng/autofocus';
import { PARENT_INSTANCE } from 'primeng/basecomponent';
import { BaseEditableHolder } from 'primeng/baseeditableholder';
import { Bind } from 'primeng/bind';
import { BindModule } from 'primeng/bind';
import { StarFillIcon, StarIcon } from 'primeng/icons';
import { Nullable } from 'primeng/ts-helpers';
import { RatingPassThrough } from 'primeng/types/rating';
import type { RatingRateEvent } from 'primeng/types/rating';
import { RatingStyle } from './style/ratingstyle';

const RATING_INSTANCE = new InjectionToken<Rating>('RATING_INSTANCE');

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
    imports: [CommonModule, AutoFocus, StarFillIcon, StarIcon, SharedModule, BindModule],
    standalone: true,
    template: `
        <ng-template ngFor [ngForOf]="starsArray" let-star let-i="index">
            <div [class]="cx('option', { star, value })" (click)="onOptionClick($event, star + 1)" [pBind]="ptm('option')">
                <span class="p-hidden-accessible" [attr.data-p-hidden-accessible]="true" [pBind]="ptm('hiddenOptionInputContainer')">
                    <input
                        type="radio"
                        [value]="star + 1"
                        [attr.name]="name() || nameattr + '_name'"
                        [attr.value]="modelValue()"
                        [attr.required]="required() ? '' : undefined"
                        [attr.readonly]="readonly ? '' : undefined"
                        [attr.disabled]="$disabled() ? '' : undefined"
                        [checked]="value === star + 1"
                        [attr.aria-label]="starAriaLabel(star + 1)"
                        (focus)="onInputFocus($event, star + 1)"
                        (blur)="onInputBlur($event)"
                        (change)="onChange($event, star + 1)"
                        [pAutoFocus]="autofocus"
                        [pBind]="ptm('hiddenOptionInput')"
                    />
                </span>
                @if (star + 1 <= value) {
                    @if (onIconTemplate || _onIconTemplate) {
                        <ng-container *ngTemplateOutlet="onIconTemplate || _onIconTemplate; context: { $implicit: star + 1, class: cx('onIcon') }"></ng-container>
                    } @else {
                        <span [class]="cx('onIcon')" *ngIf="iconOnClass" [ngStyle]="iconOnStyle" [ngClass]="iconOnClass" [pBind]="ptm('onIcon')"></span>
                        <svg data-p-icon="star-fill" *ngIf="!iconOnClass" [ngStyle]="iconOnStyle" [class]="cx('onIcon')" [pBind]="ptm('onIcon')" />
                    }
                } @else {
                    @if (offIconTemplate || _offIconTemplate) {
                        <ng-container *ngTemplateOutlet="offIconTemplate || _offIconTemplate; context: { $implicit: star + 1, class: cx('offIcon') }"></ng-container>
                    } @else {
                        <span [class]="cx('offIcon')" *ngIf="iconOffClass" [ngStyle]="iconOffStyle" [ngClass]="iconOffClass" [pBind]="ptm('offIcon')"></span>
                        <svg data-p-icon="star" *ngIf="!iconOffClass" [ngStyle]="iconOffStyle" [class]="cx('offIcon')" [pBind]="ptm('offIcon')" />
                    }
                }
            </div>
        </ng-template>
    `,
    providers: [RATING_VALUE_ACCESSOR, RatingStyle, { provide: RATING_INSTANCE, useExisting: Rating }, { provide: PARENT_INSTANCE, useExisting: Rating }],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': "cx('root')"
    },
    hostDirectives: [Bind]
})
export class Rating extends BaseEditableHolder<RatingPassThrough> {
    $pcRating: Rating | undefined = inject(RATING_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    bindDirectiveInstance = inject(Bind, { self: true });

    onAfterViewChecked(): void {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }

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
    @ContentChild('onicon', { descendants: false }) onIconTemplate: Nullable<TemplateRef<any>>;
    /**
     * Custom off icon template.
     * @group Templates
     */
    @ContentChild('officon', { descendants: false }) offIconTemplate: Nullable<TemplateRef<any>>;

    @ContentChildren(PrimeTemplate) templates!: QueryList<PrimeTemplate>;

    value: Nullable<number>;

    public starsArray: Nullable<number[]>;

    isFocusVisibleItem: boolean = true;

    focusedOptionIndex = signal<number>(-1);

    nameattr: string | undefined;

    _componentStyle = inject(RatingStyle);

    _onIconTemplate: TemplateRef<any> | undefined;

    _offIconTemplate: TemplateRef<any> | undefined;

    onInit() {
        this.nameattr = this.nameattr || uuid('pn_id_');
        this.starsArray = [];
        for (let i = 0; i < this.stars; i++) {
            this.starsArray[i] = i;
        }
    }

    onAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'onicon':
                    this._onIconTemplate = item.template;
                    break;

                case 'officon':
                    this._offIconTemplate = item.template;
                    break;
            }
        });
    }

    onOptionClick(event, value) {
        if (!this.readonly && !this.$disabled()) {
            this.onOptionSelect(event, value);
            this.isFocusVisibleItem = false;
            const firstFocusableEl = <any>getFirstFocusableElement(event.currentTarget, '');

            firstFocusableEl && focus(firstFocusableEl);
        }
    }

    onOptionSelect(event, value) {
        if (!this.readonly && !this.$disabled()) {
            if (this.focusedOptionIndex() === value || value === this.value) {
                this.focusedOptionIndex.set(-1);
                this.updateModel(event, null);
            } else {
                this.focusedOptionIndex.set(value);
                this.updateModel(event, value || null);
            }
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
        if (!this.readonly && !this.$disabled()) {
            this.focusedOptionIndex.set(value);
            this.isFocusVisibleItem = event.sourceCapabilities?.firesTouchEvents === false;

            this.onFocus.emit(event);
        }
    }

    updateModel(event, value) {
        this.writeValue(value);
        this.onModelChange(this.value);
        this.onModelTouched();

        this.onRate.emit({
            originalEvent: event,
            value
        });
    }

    starAriaLabel(value) {
        return value === 1 ? this.config.translation.aria?.star : this.config.translation.aria?.stars?.replace(/{star}/g, value);
    }

    getIconTemplate(i: number): Nullable<TemplateRef<any>> {
        return !this.value || i >= this.value ? this.offIconTemplate || this._offIconTemplate : this.onIconTemplate || this.offIconTemplate;
    }

    /**
     * @override
     *
     * @see {@link BaseEditableHolder.writeControlValue}
     * Writes the value to the control.
     */
    writeControlValue(value: any, setModelValue: (value: any) => void): void {
        this.value = value;
        setModelValue(value);
    }

    get isCustomIcon(): boolean {
        return !!(this.onIconTemplate || this._onIconTemplate || this.offIconTemplate || this._offIconTemplate);
    }
}

@NgModule({
    imports: [Rating, SharedModule],
    exports: [Rating, SharedModule]
})
export class RatingModule {}
