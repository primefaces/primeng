import { Injectable } from '@angular/core';
import { BaseStyle } from 'primeng/base';
import { style } from '@primeuix/styles/autocomplete';
import { css, dt } from '@primeuix/styled';

const theme = css`
    ${style}

    /* For PrimeNG */
   .p-autocomplete-clear-icon {
        position: absolute;
        top: 50%;
        margin-top: -0.5rem;
        cursor: pointer;
        right: ${dt('autocomplete.padding.x')};
        color: ${dt('autocomplete.dropdown.color')};
    }

    .p-autocomplete:has(.p-autocomplete-dropdown) .p-autocomplete-clear-icon {
        right: calc(${dt('autocomplete.padding.x')} + ${dt('autocomplete.dropdown.width')});
    }
    p-autoComplete.ng-invalid.ng-dirty .p-autocomplete-input,
    p-autoComplete.ng-invalid.ng-dirty .p-autocomplete-input-multiple,
    p-auto-complete.ng-invalid.ng-dirty .p-autocomplete-input,
    p-auto-complete.ng-invalid.ng-dirty .p-autocomplete-input-multiple p-autocomplete.ng-invalid.ng-dirty .p-autocomplete-input,
    p-autocomplete.ng-invalid.ng-dirty .p-autocomplete-input-multiple {
        border-color: ${dt('autocomplete.invalid.border.color')};
    }
    p-autoComplete.ng-invalid.ng-dirty .p-autocomplete-input:enabled:focus,
    p-autoComplete.ng-invalid.ng-dirty:not(.p-disabled).p-focus .p-autocomplete-input-multiple,
    p-auto-complete.ng-invalid.ng-dirty .p-autocomplete-input:enabled:focus,
    p-auto-complete.ng-invalid.ng-dirty:not(.p-disabled).p-focus .p-autocomplete-input-multiple,
    p-autocomplete.ng-invalid.ng-dirty .p-autocomplete-input:enabled:focus,
    p-autocomplete.ng-invalid.ng-dirty:not(.p-disabled).p-focus .p-autocomplete-input-multiple {
        border-color: ${dt('autocomplete.focus.border.color')};
    }
    p-autoComplete.ng-invalid.ng-dirty .p-autocomplete-input-chip input::placeholder,
    p-auto-complete.ng-invalid.ng-dirty .p-autocomplete-input-chip input::placeholder,
    p-autocomplete.ng-invalid.ng-dirty .p-autocomplete-input-chip input::placeholder {
        color: ${dt('autocomplete.invalid.placeholder.color')};
    }

    p-autoComplete.ng-invalid.ng-dirty .p-autocomplete-input::placeholder,
    p-auto-complete.ng-invalid.ng-dirty .p-autocomplete-input::placeholder,
    p-autocomplete.ng-invalid.ng-dirty .p-autocomplete-input::placeholder {
        color: ${dt('autocomplete.invalid.placeholder.color')};
    }
`;

const inlineStyles = {
    root: { position: 'relative' }
};

const classes = {
    root: ({ instance }) => [
        'p-autocomplete p-component p-inputwrapper',
        instance.styleClass,
        {
            'p-disabled': instance.disabled,
            'p-focus': instance.focused,
            'p-inputwrapper-filled': instance.filled,
            'p-inputwrapper-focus': (instance.focused && !instance.disabled) || instance.autofocus || instance.overlayVisible,
            'p-autocomplete-open': instance.overlayVisible,
            'p-autocomplete-clearable': instance.showClear && !instance.disabled,
            // 'p-invalid': instance.invalid,
            'p-autocomplete-fluid': instance.hasFluid
        }
    ],
    pcInputText: ({ instance }) => ['p-autocomplete-input', instance.inputStyleClass],
    inputMultiple: ({ instance }) => ({
        'p-autocomplete-input-multiple': true,
        'p-variant-filled': (instance.variant ?? (instance.config.inputStyle() || instance.config.inputVariant())) === 'filled'
    }),
    chipItem: ({ instance, i }) => [
        'p-autocomplete-chip-item',
        {
            'p-focus': instance.focusedMultipleOptionIndex() === i
        }
    ],
    pcChip: 'p-autocomplete-chip',
    chipIcon: 'p-autocomplete-chip-icon',
    inputChip: 'p-autocomplete-input-chip',
    loader: ({ instance }) => ({
        'p-autocomplete-loader': true,
        'pi-spin': instance.loading
    }),
    dropdown: 'p-autocomplete-dropdown',
    overlay: 'p-autocomplete-overlay p-component',
    listContainer: 'p-autocomplete-list-container',
    list: ({ contentStyleClass }) => ['p-autocomplete-list', contentStyleClass],
    optionGroup: 'p-autocomplete-option-group',
    option: ({ instance, option, i, scrollerOptions }) => ({
        'p-autocomplete-option': true,
        'p-autocomplete-option-selected': instance.isSelected(option),
        'p-focus': instance.focusedOptionIndex() === instance.getOptionIndex(i, scrollerOptions),
        'p-disabled': instance.isOptionDisabled(option)
    }),
    emptyMessage: 'p-autocomplete-empty-message',
    clearIcon: 'p-autocomplete-clear-icon'
};

@Injectable()
export class AutoCompleteStyle extends BaseStyle {
    name = 'autocomplete';

    theme = theme;

    classes = classes;

    inlineStyles = inlineStyles;
}

/**
 *
 * AutoComplete is an input component that provides real-time suggestions while being typed.
 *
 * [Live Demo](https://www.primeng.org/autocomplete/)
 *
 * @module autocompletestyle
 *
 */
export enum AutoCompleteClasses {
    /**
     * Class name of the root element
     */
    root = 'p-autocomplete',
    /**
     * Class name of the input element
     */
    pcInputText = 'p-autocomplete-input',
    /**
     * Class name of the input multiple element
     */
    inputMultiple = 'p-autocomplete-input-multiple',
    /**
     * Class name of the chip item element
     */
    chipItem = 'p-autocomplete-chip-item',
    /**
     * Class name of the chip element
     */
    pcChip = 'p-autocomplete-chip',
    /**
     * Class name of the chip icon element
     */
    chipIcon = 'p-autocomplete-chip-icon',
    /**
     * Class name of the input chip element
     */
    inputChip = 'p-autocomplete-input-chip',
    /**
     * Class name of the loader element
     */
    loader = 'p-autocomplete-loader',
    /**
     * Class name of the dropdown element
     */
    dropdown = 'p-autocomplete-dropdown',
    /**
     * Class name of the panel element
     */
    panel = 'p-autocomplete-overlay',
    /**
     * Class name of the list element
     */
    list = 'p-autocomplete-list',
    /**
     * Class name of the option group element
     */
    optionGroup = 'p-autocomplete-option-group',
    /**
     * Class name of the option element
     */
    option = 'p-autocomplete-option',
    /**
     * Class name of the empty message element
     */
    emptyMessage = 'p-autocomplete-empty-message',
    /**
     * Class name of the clear icon
     */
    clearIcon = 'p-autocomplete-clear-icon'
}

export interface AutoCompleteStyle extends BaseStyle {}
