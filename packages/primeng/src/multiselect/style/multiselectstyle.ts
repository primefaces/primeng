import { Injectable } from '@angular/core';
import { style } from '@primeuix/styles/multiselect';
import { BaseStyle } from 'primeng/base';

const theme = /*css*/ `
    ${style}

    /* For PrimeNG */
   .p-multiselect.ng-invalid.ng-dirty {
        border-color: dt('multiselect.invalid.border.color');
    }
    p-multiSelect.ng-invalid.ng-dirty .p-multiselect-label.p-placeholder,
    p-multi-select.ng-invalid.ng-dirty .p-multiselect-label.p-placeholder,
    p-multiselect.ng-invalid.ng-dirty .p-multiselect-label.p-placeholder {
        color: dt('multiselect.invalid.placeholder.color');
    }
`;

const inlineStyles = {
    root: ({ instance }) => ({ position: instance.$appendTo() === 'self' ? 'relative' : undefined })
};

const classes = {
    root: ({ instance }) => [
        'p-multiselect p-component p-inputwrapper',
        {
            'p-multiselect p-component p-inputwrapper': true,
            'p-multiselect-display-chip': instance.display === 'chip',
            'p-disabled': instance.disabled(),
            'p-invalid': instance.invalid(),
            'p-variant-filled': instance.$variant(),
            'p-focus': instance.focused,
            'p-inputwrapper-filled': instance.$filled(),
            'p-inputwrapper-focus': instance.focused || instance.overlayVisible,
            'p-multiselect-open': instance.overlayVisible,
            'p-multiselect-fluid': instance.hasFluid,
            'p-multiselect-sm p-inputfield-sm': instance.size() === 'small',
            'p-multiselect-lg p-inputfield-lg': instance.size() === 'large'
        }
    ],
    labelContainer: 'p-multiselect-label-container',
    label: ({ instance }) => ({
        'p-multiselect-label': true,
        'p-placeholder': instance.label() === instance.placeholder(),
        'p-multiselect-label-empty': !instance.placeholder() && !instance.defaultLabel && (!instance.modelValue() || instance.modelValue().length === 0)
    }),
    chipItem: 'p-multiselect-chip-item',
    pcChip: 'p-multiselect-chip',
    chipIcon: 'p-multiselect-chip-icon',
    dropdown: 'p-multiselect-dropdown',
    loadingIcon: 'p-multiselect-loading-icon',
    dropdownIcon: 'p-multiselect-dropdown-icon',
    overlay: 'p-multiselect-overlay p-component',
    header: 'p-multiselect-header',
    pcFilterContainer: 'p-multiselect-filter-container',
    pcFilter: 'p-multiselect-filter',
    listContainer: 'p-multiselect-list-container',
    list: 'p-multiselect-list',
    optionGroup: 'p-multiselect-option-group',
    option: ({ instance }) => ({
        'p-multiselect-option': true,
        'p-multiselect-option-selected': instance.selected && instance.highlightOnSelect,
        'p-disabled': instance.disabled,
        'p-focus': instance.focused
    }),
    emptyMessage: 'p-multiselect-empty-message',
    clearIcon: 'p-multiselect-clear-icon'
};

@Injectable()
export class MultiSelectStyle extends BaseStyle {
    name = 'multiselect';

    theme = theme;

    classes = classes;

    inlineStyles = inlineStyles;
}

/**
 *
 * MultiSelect is used to select multiple items from a collection.
 *
 * [Live Demo](https://www.primeng.org/multiselect/)
 *
 * @module multiselectstyle
 *
 */
export enum MultiSelectClasses {
    /**
     * Class name of the root element
     */
    root = 'p-multiselect',
    /**
     * Class name of the label container element
     */
    labelContainer = 'p-multiselect-label-container',
    /**
     * Class name of the label element
     */
    label = 'p-multiselect-label',
    /**
     * Class name of the chip item element
     */
    chipItem = 'p-multiselect-chip-item',
    /**
     * Class name of the chip element
     */
    pcChip = 'p-multiselect-chip',
    /**
     * Class name of the chip icon element
     */
    chipIcon = 'p-multiselect-chip-icon',
    /**
     * Class name of the dropdown element
     */
    dropdown = 'p-multiselect-dropdown',
    /**
     * Class name of the loading icon element
     */
    loadingIcon = 'p-multiselect-loading-icon',
    /**
     * Class name of the dropdown icon element
     */
    dropdownIcon = 'p-multiselect-dropdown-icon',
    /**
     * Class name of the overlay element
     */
    overlay = 'p-multiselect-overlay',
    /**
     * Class name of the header element
     */
    header = 'p-multiselect-header',
    /**
     * Class name of the filter container element
     */
    pcFilterContainer = 'p-multiselect-filter-container',
    /**
     * Class name of the filter element
     */
    pcFilter = 'p-multiselect-filter',
    /**
     * Class name of the list container element
     */
    listContainer = 'p-multiselect-list-container',
    /**
     * Class name of the list element
     */
    list = 'p-multiselect-list',
    /**
     * Class name of the option group element
     */
    optionGroup = 'p-multiselect-option-group',
    /**
     * Class name of the option element
     */
    option = 'p-multiselect-option',
    /**
     * Class name of the empty message element
     */
    emptyMessage = 'p-multiselect-empty-message',
    /**
     * Class name of the clear icon
     */
    clearIcon = 'p-autocomplete-clear-icon'
}

export interface MultiSelectStyle extends BaseStyle {}
