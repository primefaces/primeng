import { Injectable } from '@angular/core';
import { style } from '@primeuix/styles/select';
import { BaseStyle } from 'primeng/base';

const theme = /*css*/ `
    ${style}

    /* For PrimeNG */
    .p-select-label.p-placeholder {
        color: dt('select.placeholder.color');
    }

    .p-select.ng-invalid.ng-dirty {
        border-color: dt('select.invalid.border.color');
    }

    .p-dropdown.ng-invalid.ng-dirty .p-dropdown-label.p-placeholder,
    .p-select.ng-invalid.ng-dirty .p-select-label.p-placeholder {
        color: dt('select.invalid.placeholder.color');
    }
`;

const classes = {
    root: ({ instance }) => [
        'p-select p-component p-inputwrapper',
        {
            'p-disabled': instance.disabled(),
            'p-variant-filled': instance.$variant() === 'filled',
            'p-focus': instance.focused,
            'p-invalid': instance.invalid(),
            'p-inputwrapper-filled': instance.$filled(),
            'p-inputwrapper-focus': instance.focused || instance.overlayVisible,
            'p-select-open': instance.overlayVisible,
            'p-select-fluid': instance.hasFluid,
            'p-select-sm p-inputfield-sm': instance.size() === 'small',
            'p-select-lg p-inputfield-lg': instance.size() === 'large'
        }
    ],
    label: ({ instance }) => [
        'p-select-label',
        {
            'p-placeholder': instance.placeholder() && instance.label() === instance.placeholder(),
            'p-select-label-empty': !instance.editable && !instance.selectedItemTemplate && (instance.label() === undefined || instance.label() === null || instance.label() === 'p-emptylabel' || instance.label().length === 0)
        }
    ],
    clearIcon: 'p-select-clear-icon',
    dropdown: 'p-select-dropdown',
    loadingIcon: 'p-select-loading-icon',
    dropdownIcon: 'p-select-dropdown-icon',
    overlay: 'p-select-overlay p-component',
    header: 'p-select-header',
    pcFilter: 'p-select-filter',
    listContainer: 'p-select-list-container',
    list: 'p-select-list',
    optionGroup: 'p-select-option-group',
    optionGroupLabel: 'p-select-option-group-label',
    option: ({ instance }) => [
        'p-select-option',
        {
            'p-select-option-selected': instance.selected && !instance.checkmark,
            'p-disabled': instance.disabled,
            'p-focus': instance.focused
        }
    ],
    optionLabel: 'p-select-option-label',
    optionCheckIcon: 'p-select-option-check-icon',
    optionBlankIcon: 'p-select-option-blank-icon',
    emptyMessage: 'p-select-empty-message'
};

@Injectable()
export class SelectStyle extends BaseStyle {
    name = 'select';

    theme = theme;

    classes = classes;
}

/**
 *
 * Select also known as Select, is used to choose an item from a collection of options.
 *
 * [Live Demo](https://www.primeng.org/select/)
 *
 * @module selectstyle
 *
 */
export enum SelectClasses {
    /**
     * Class name of the root element
     */
    root = 'p-select',
    /**
     * Class name of the label element
     */
    label = 'p-select-label',
    /**
     * Class name of the clear icon element
     */
    clearIcon = 'p-select-clear-icon',
    /**
     * Class name of the dropdown element
     */
    dropdown = 'p-select-dropdown',
    /**
     * Class name of the loadingicon element
     */
    loadingIcon = 'p-select-loading-icon',
    /**
     * Class name of the dropdown icon element
     */
    dropdownIcon = 'p-select-dropdown-icon',
    /**
     * Class name of the overlay element
     */
    overlay = 'p-select-overlay',
    /**
     * Class name of the header element
     */
    header = 'p-select-header',
    /**
     * Class name of the filter element
     */
    pcFilter = 'p-select-filter',
    /**
     * Class name of the list container element
     */
    listContainer = 'p-select-list-container',
    /**
     * Class name of the list element
     */
    list = 'p-select-list',
    /**
     * Class name of the option group element
     */
    optionGroup = 'p-select-option-group',
    /**
     * Class name of the option group label element
     */
    optionGroupLabel = 'p-select-option-group-label',
    /**
     * Class name of the option element
     */
    option = 'p-select-option',
    /**
     * Class name of the option label element
     */
    optionLabel = 'p-select-option-label',
    /**
     * Class name of the option check icon element
     */
    optionCheckIcon = 'p-select-option-check-icon',
    /**
     * Class name of the option blank icon element
     */
    optionBlankIcon = 'p-select-option-blank-icon',
    /**
     * Class name of the empty message element
     */
    emptyMessage = 'p-select-empty-message'
}

export interface SelectStyle extends BaseStyle {}
