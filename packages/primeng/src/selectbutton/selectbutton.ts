import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, contentChild, forwardRef, inject, InjectionToken, input, NgModule, numberAttribute, output, Provider, signal, TemplateRef, ViewEncapsulation } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { equals, resolveFieldData } from '@primeuix/utils';
import { SharedModule } from 'primeng/api';
import { PARENT_INSTANCE } from 'primeng/basecomponent';
import { BaseEditableHolder } from 'primeng/baseeditableholder';
import { Bind, BindModule } from 'primeng/bind';
import { ToggleButton } from 'primeng/togglebutton';
import { SelectButtonChangeEvent, SelectButtonItemTemplateContext, SelectButtonOptionClickEvent, SelectButtonPassThrough } from 'primeng/types/selectbutton';
import type { InputSize } from 'primeng/types/shared';
import type { ToggleButtonChangeEvent } from 'primeng/types/togglebutton';
import { SelectButtonStyle } from './style/selectbuttonstyle';

const SELECTBUTTON_INSTANCE = new InjectionToken<SelectButton>('SELECTBUTTON_INSTANCE');

export const SELECTBUTTON_VALUE_ACCESSOR: Provider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectButton),
    multi: true
};
/**
 * SelectButton is used to choose single or multiple items from a list using buttons.
 * @group Components
 */
@Component({
    selector: 'p-selectbutton, p-select-button',
    standalone: true,
    imports: [ToggleButton, FormsModule, NgTemplateOutlet, SharedModule, BindModule],
    template: `
        @for (option of options(); track getOptionLabel(option); let i = $index) {
            <p-togglebutton
                [autofocus]="autofocus()"
                [class]="styleClass()"
                [ngModel]="isSelected(option)"
                [onLabel]="getOptionLabel(option)"
                [offLabel]="getOptionLabel(option)"
                [disabled]="isButtonDisabled(option)"
                (onChange)="onOptionSelect($event, option, i)"
                [allowEmpty]="getAllowEmpty()"
                [size]="size()"
                [fluid]="fluid()"
                [pt]="ptm('pcToggleButton')"
                [unstyled]="unstyled()"
            >
                @if (itemTemplate()) {
                    <ng-template #content>
                        <ng-container *ngTemplateOutlet="itemTemplate(); context: getItemContext(option, i)"></ng-container>
                    </ng-template>
                }
            </p-togglebutton>
        }
    `,
    providers: [SELECTBUTTON_VALUE_ACCESSOR, SelectButtonStyle, { provide: SELECTBUTTON_INSTANCE, useExisting: SelectButton }, { provide: PARENT_INSTANCE, useExisting: SelectButton }],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': "cx('root')",
        '[attr.role]': '"group"',
        '[attr.aria-labelledby]': 'ariaLabelledBy()',
        '[attr.data-p]': 'dataP()'
    },
    hostDirectives: [Bind]
})
export class SelectButton extends BaseEditableHolder<SelectButtonPassThrough> {
    componentName = 'SelectButton';
    /**
     * An array of selectitems to display as the available options.
     * @group Props
     */
    options = input<any[]>();
    /**
     * Name of the label field of an option.
     * @group Props
     */
    optionLabel = input<string>();
    /**
     * Name of the value field of an option.
     * @group Props
     */
    optionValue = input<string>();
    /**
     * Name of the disabled field of an option.
     * @group Props
     */
    optionDisabled = input<string>();
    /**
     * Whether selection can be cleared.
     * @group Props
     */
    unselectable = input(false, { transform: booleanAttribute });
    /**
     * Index of the element in tabbing order.
     * @group Props
     */
    tabindex = input(0, { transform: numberAttribute });
    /**
     * When specified, allows selecting multiple values.
     * @group Props
     */
    multiple = input(false, { transform: booleanAttribute });
    /**
     * Whether selection can not be cleared.
     * @group Props
     */
    allowEmpty = input(true, { transform: booleanAttribute });
    /**
     * Style class of the component.
     * @group Props
     */
    styleClass = input<string>();
    /**
     * Establishes relationships between the component and label(s) where its value should be one or more element IDs.
     * @group Props
     */
    ariaLabelledBy = input<string>();
    /**
     * A property to uniquely identify a value in options.
     * @group Props
     */
    dataKey = input<string>();
    /**
     * When present, it specifies that the component should automatically get focus on load.
     * @group Props
     */
    autofocus = input(false, { transform: booleanAttribute });
    /**
     * Specifies the size of the component.
     * @defaultValue undefined
     * @group Props
     */
    size = input<InputSize>();
    /**
     * Spans 100% width of the container when enabled.
     * @defaultValue undefined
     * @group Props
     */
    fluid = input(false, { transform: booleanAttribute });
    /**
     * Callback to invoke on input click.
     * @param {SelectButtonOptionClickEvent} event - Custom click event.
     * @group Emits
     */
    onOptionClick = output<SelectButtonOptionClickEvent>();
    /**
     * Callback to invoke on selection change.
     * @param {SelectButtonChangeEvent} event - Custom change event.
     * @group Emits
     */
    onChange = output<SelectButtonChangeEvent>();
    /**
     * Custom item template.
     * @param {SelectButtonItemTemplateContext} context - item context.
     * @see {@link SelectButtonItemTemplateContext}
     * @group Templates
     */
    itemTemplate = contentChild<TemplateRef<SelectButtonItemTemplateContext>>('item', { descendants: false });

    equalityKey = computed(() => (this.optionValue() ? null : this.dataKey()));

    $allowEmpty = computed(() => (this.unselectable() ? false : this.allowEmpty()));

    dataP = computed(() =>
        this.cn({
            invalid: this.invalid()
        })
    );

    value = signal<any>(null);

    focusedIndex = signal(0);

    _componentStyle = inject(SelectButtonStyle);

    $pcSelectButton: SelectButton | undefined = inject(SELECTBUTTON_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    bindDirectiveInstance = inject(Bind, { self: true });

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }

    getAllowEmpty() {
        if (this.multiple()) {
            return this.$allowEmpty() || this.value()?.length !== 1;
        }
        return this.$allowEmpty();
    }

    getOptionLabel(option: any) {
        const optionLabel = this.optionLabel();
        return optionLabel ? resolveFieldData(option, optionLabel) : option.label != undefined ? option.label : option;
    }

    getOptionValue(option: any) {
        const optionValue = this.optionValue();
        const optionLabel = this.optionLabel();
        return optionValue ? resolveFieldData(option, optionValue) : optionLabel || option.value === undefined ? option : option.value;
    }

    isOptionDisabled(option: any) {
        const optionDisabled = this.optionDisabled();
        return optionDisabled ? resolveFieldData(option, optionDisabled) : option.disabled !== undefined ? option.disabled : false;
    }

    isButtonDisabled(option: any) {
        return this.$disabled() || this.isOptionDisabled(option);
    }

    getItemContext(option: any, index: number) {
        return { $implicit: option, index };
    }

    onOptionSelect(event: ToggleButtonChangeEvent, option: any, index: number) {
        if (this.$disabled() || this.isOptionDisabled(option)) {
            return;
        }

        let selected = this.isSelected(option);

        if (selected && this.unselectable()) {
            return;
        }

        let optionValue = this.getOptionValue(option);
        let newValue;

        if (this.multiple()) {
            if (selected) newValue = this.value().filter((val: any) => !equals(val, optionValue, this.equalityKey() || undefined));
            else newValue = this.value() ? [...this.value(), optionValue] : [optionValue];
        } else {
            if (selected && !this.$allowEmpty()) {
                return;
            }
            newValue = selected ? null : optionValue;
        }

        this.focusedIndex.set(index);
        this.value.set(newValue);
        this.writeModelValue(this.value());
        this.onModelChange(this.value());

        this.onChange.emit({
            originalEvent: event.originalEvent,
            value: this.value()
        });

        this.onOptionClick.emit({
            originalEvent: event.originalEvent,
            option: option,
            index: index
        });
    }

    changeTabIndexes(event: Event, direction: string) {
        let firstTabableChild: { elem: HTMLElement; index: number } | undefined;
        let index: number;

        for (let i = 0; i <= this.el.nativeElement.children.length - 1; i++) {
            if (this.el.nativeElement.children[i].getAttribute('tabindex') === '0') firstTabableChild = { elem: this.el.nativeElement.children[i], index: i };
        }

        if (!firstTabableChild) return;

        if (direction === 'prev') {
            if (firstTabableChild.index === 0) index = this.el.nativeElement.children.length - 1;
            else index = firstTabableChild.index - 1;
        } else {
            if (firstTabableChild.index === this.el.nativeElement.children.length - 1) index = 0;
            else index = firstTabableChild.index + 1;
        }

        this.focusedIndex.set(index);
        this.el.nativeElement.children[index].focus();
    }

    onFocus(event: Event, index: number) {
        this.focusedIndex.set(index);
    }

    onBlur() {
        this.onModelTouched();
    }

    removeOption(option: any) {
        this.value.set(this.value().filter((val: any) => !equals(val, this.getOptionValue(option), this.dataKey())));
    }

    isSelected(option: any) {
        let selected = false;
        const optionValue = this.getOptionValue(option);

        if (this.multiple()) {
            if (this.value() && Array.isArray(this.value())) {
                for (let val of this.value()) {
                    if (equals(val, optionValue, this.dataKey())) {
                        selected = true;
                        break;
                    }
                }
            }
        } else {
            selected = equals(this.getOptionValue(option), this.value(), this.equalityKey() || undefined);
        }

        return selected;
    }

    /**
     * @override
     *
     * @see {@link BaseEditableHolder.writeControlValue}
     * Writes the value to the control.
     */
    writeControlValue(value: any, setModelValue: (value: any) => void) {
        this.value.set(value);
        setModelValue(this.value());
    }
}

@NgModule({
    imports: [SelectButton, SharedModule],
    exports: [SelectButton, SharedModule]
})
export class SelectButtonModule {}
