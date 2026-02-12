import { NgStyle, NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, contentChild, forwardRef, inject, InjectionToken, input, NgModule, numberAttribute, output, Provider, signal, TemplateRef, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { focus, getFirstFocusableElement, uuid } from '@primeuix/utils';
import { SharedModule } from 'primeng/api';
import { AutoFocus } from 'primeng/autofocus';
import { PARENT_INSTANCE } from 'primeng/basecomponent';
import { BaseEditableHolder } from 'primeng/baseeditableholder';
import { Bind, BindModule } from 'primeng/bind';
import { StarFillIcon, StarIcon } from 'primeng/icons';
import { Nullable } from 'primeng/ts-helpers';
import type { RatingIconTemplateContext, RatingPassThrough, RatingRateEvent } from 'primeng/types/rating';
import type { CSSProperties } from 'primeng/types/shared';
import { RatingStyle } from './style/ratingstyle';

const RATING_INSTANCE = new InjectionToken<Rating>('RATING_INSTANCE');

export const RATING_VALUE_ACCESSOR: Provider = {
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
    imports: [NgTemplateOutlet, AutoFocus, StarFillIcon, StarIcon, SharedModule, BindModule],
    standalone: true,
    template: `
        @for (star of starsArray; track star; let i = $index) {
            <div [class]="cx('option', { star, value: value() })" (click)="onOptionClick($event, star + 1)" [pBind]="ptm('option')">
                <span class="p-hidden-accessible" [attr.data-p-hidden-accessible]="true" [pBind]="ptm('hiddenOptionInputContainer')">
                    <input
                        type="radio"
                        [value]="star + 1"
                        [attr.name]="attrName()"
                        [attr.value]="modelValue()"
                        [attr.required]="attrRequired()"
                        [attr.readonly]="attrReadonly()"
                        [attr.disabled]="attrDisabled()"
                        [checked]="isChecked(star)"
                        [attr.aria-label]="starAriaLabel(star + 1)"
                        (focus)="onInputFocus($event, star + 1)"
                        (blur)="onInputBlur($event)"
                        (change)="onChange($event, star + 1)"
                        [pAutoFocus]="autofocus()"
                        [pBind]="ptm('hiddenOptionInput')"
                    />
                </span>
                @if (star + 1 <= value()) {
                    @if (onIconTemplate()) {
                        <ng-container *ngTemplateOutlet="onIconTemplate(); context: getOnIconContext(star)"></ng-container>
                    } @else {
                        @if (iconOnClass()) {
                            <span [class]="cn(cx('onIcon'), iconOnClass())" [style]="iconOnStyle()" [pBind]="ptm('onIcon')"></span>
                        } @else {
                            <svg data-p-icon="star-fill" [style]="iconOnStyle()" [class]="cx('onIcon')" [pBind]="ptm('onIcon')" />
                        }
                    }
                } @else {
                    @if (offIconTemplate()) {
                        <ng-container *ngTemplateOutlet="offIconTemplate(); context: getOffIconContext(star)"></ng-container>
                    } @else {
                        @if (iconOffClass()) {
                            <span [class]="cn(cx('offIcon'), iconOffClass())" [style]="iconOffStyle()" [pBind]="ptm('offIcon')"></span>
                        } @else {
                            <svg data-p-icon="star" [style]="iconOffStyle()" [class]="cx('offIcon')" [pBind]="ptm('offIcon')" />
                        }
                    }
                }
            </div>
        }
    `,
    providers: [RATING_VALUE_ACCESSOR, RatingStyle, { provide: RATING_INSTANCE, useExisting: Rating }, { provide: PARENT_INSTANCE, useExisting: Rating }],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': "cx('root')",
        '[attr.data-p]': 'dataP()'
    },
    hostDirectives: [Bind]
})
export class Rating extends BaseEditableHolder<RatingPassThrough> {
    componentName = 'Rating';

    $pcRating: Rating | undefined = inject(RATING_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    bindDirectiveInstance = inject(Bind, { self: true });

    onAfterViewChecked(): void {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }

    /**
     * When present, changing the value is not possible.
     * @group Props
     */
    readonly = input(false, { transform: booleanAttribute });
    /**
     * Number of stars.
     * @group Props
     */
    stars = input(5, { transform: numberAttribute });
    /**
     * Style class of the on icon.
     * @group Props
     */
    iconOnClass = input<string>();
    /**
     * Inline style of the on icon.
     * @group Props
     */
    iconOnStyle = input<CSSProperties>();
    /**
     * Style class of the off icon.
     * @group Props
     */
    iconOffClass = input<string>();
    /**
     * Inline style of the off icon.
     * @group Props
     */
    iconOffStyle = input<CSSProperties>();
    /**
     * When present, it specifies that the component should automatically get focus on load.
     * @group Props
     */
    autofocus = input(false, { transform: booleanAttribute });
    /**
     * Emitted on value change.
     * @param {RatingRateEvent} value - Custom rate event.
     * @group Emits
     */
    onRate = output<RatingRateEvent>();
    /**
     * Emitted when the rating receives focus.
     * @param {Event} value - Browser event.
     * @group Emits
     */
    onFocus = output<FocusEvent>();
    /**
     * Emitted when the rating loses focus.
     * @param {Event} value - Browser event.
     * @group Emits
     */
    onBlur = output<FocusEvent>();
    /**
     * Custom on icon template.
     * @param {RatingIconTemplateContext} context - icon context.
     * @see {@link RatingIconTemplateContext}
     * @group Templates
     */
    onIconTemplate = contentChild<TemplateRef<RatingIconTemplateContext>>('onicon', { descendants: false });
    /**
     * Custom off icon template.
     * @param {RatingIconTemplateContext} context - icon context.
     * @see {@link RatingIconTemplateContext}
     * @group Templates
     */
    offIconTemplate = contentChild<TemplateRef<RatingIconTemplateContext>>('officon', { descendants: false });

    value = signal<Nullable<number>>(null);

    public starsArray: Nullable<number[]>;

    isFocusVisibleItem: boolean = true;

    focusedOptionIndex = signal<number>(-1);

    nameattr = signal<string | undefined>(undefined);

    _componentStyle = inject(RatingStyle);

    attrRequired = computed(() => (this.required() ? '' : undefined));

    attrReadonly = computed(() => (this.readonly() ? '' : undefined));

    attrDisabled = computed(() => (this.$disabled() ? '' : undefined));

    attrName = computed(() => this.name() || this.nameattr() + '_name');

    dataP = computed(() =>
        this.cn({
            readonly: this.readonly(),
            disabled: this.$disabled()
        })
    );

    isCustomIcon = computed(() => !!(this.onIconTemplate() || this.offIconTemplate()));

    onInit() {
        this.nameattr.set(this.nameattr() || uuid('pn_id_'));
        this.starsArray = [];
        for (let i = 0; i < this.stars(); i++) {
            this.starsArray[i] = i;
        }
    }

    onOptionClick(event: MouseEvent, value: number) {
        if (!this.readonly() && !this.$disabled()) {
            this.onOptionSelect(event, value);
            this.isFocusVisibleItem = false;
            const firstFocusableEl = getFirstFocusableElement(event.currentTarget as HTMLElement, '') as HTMLElement;

            firstFocusableEl && focus(firstFocusableEl);
        }
    }

    onOptionSelect(event: Event, value: number) {
        if (!this.readonly() && !this.$disabled()) {
            if (this.focusedOptionIndex() === value || value === this.value()) {
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

    onInputFocus(event: FocusEvent, value: number) {
        if (!this.readonly() && !this.$disabled()) {
            this.focusedOptionIndex.set(value);
            this.isFocusVisibleItem = (event as any).sourceCapabilities?.firesTouchEvents === false;

            this.onFocus.emit(event);
        }
    }

    updateModel(event: Event, value: number | null) {
        this.writeValue(value);
        this.onModelChange(this.value());
        this.onModelTouched();

        this.onRate.emit({
            originalEvent: event,
            value: value as number
        });
    }

    starAriaLabel(value: number) {
        return value === 1 ? this.config.translation.aria?.star : this.config.translation.aria?.stars?.replace(/{star}/g, String(value));
    }

    isChecked(star: number) {
        return this.value() === star + 1;
    }

    getOnIconContext(star: number) {
        return { $implicit: star + 1, class: this.cx('onIcon') };
    }

    getOffIconContext(star: number) {
        return { $implicit: star + 1, class: this.cx('offIcon') };
    }

    getIconTemplate(i: number): Nullable<TemplateRef<RatingIconTemplateContext>> {
        return !this.value() || i >= this.value()! ? this.offIconTemplate() : this.onIconTemplate() || this.offIconTemplate();
    }

    /**
     * @override
     *
     * @see {@link BaseEditableHolder.writeControlValue}
     * Writes the value to the control.
     */
    writeControlValue(value: any, setModelValue: (value: any) => void) {
        this.value.set(value);
        setModelValue(value);
    }
}

@NgModule({
    imports: [Rating, SharedModule],
    exports: [Rating, SharedModule]
})
export class RatingModule {}
