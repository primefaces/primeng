import { Injectable } from '@angular/core';
import { style } from '@primeuix/styles/cascadeselect';
import { BaseStyle } from 'primeng/base';

const theme = /*css*/ `
    ${style}

    /* For PrimeNG */
    .p-cascadeselect.ng-invalid.ng-dirty:not(.ng-untouched):not(.ng-pristine) {
        border-color: dt('cascadeselect.invalid.border.color');
    }

    .p-cascadeselect.ng-invalid.ng-dirty:not(.ng-untouched):not(.ng-pristine) .p-cascadeselect-label.p-placeholder {
        color: dt('cascadeselect.invalid.placeholder.color');
    }
`;
const inlineStyles = {
    root: ({ instance }) => ({ position: instance.$appendTo() === 'self' ? 'relative' : undefined })
};

const classes = {
    root: ({ instance }) => [
        'p-cascadeselect p-component p-inputwrapper',
        {
            'p-cascadeselect p-component p-inputwrapper': true,
            'p-cascadeselect-clearable': instance.showClear && !instance.disabled(),
            'p-cascadeselect-mobile': instance.queryMatches(),
            'p-disabled': instance.disabled(),
            'p-invalid': instance.invalid(),
            'p-focus': instance.focused,
            'p-inputwrapper-filled': instance.modelValue(),
            'p-variant-filled': instance.$variant() === 'filled',
            'p-inputwrapper-focus': instance.focused || instance.overlayVisible,
            'p-cascadeselect-open': instance.overlayVisible,
            'p-cascadeselect-fluid': instance.hasFluid,
            'p-cascadeselect-sm p-inputfield-sm': instance.size() === 'small',
            'p-cascadeselect-lg p-inputfield-lg': instance.size() === 'large'
        }
    ],
    label: ({ instance }) => [
        'p-cascadeselect-label',
        {
            'p-placeholder': instance.label() === instance.placeholder,
            'p-cascadeselect-label-empty': !instance.value && (instance.label() === 'p-emptylabel' || instance.label().length === 0)
        }
    ],
    clearIcon: 'p-cascadeselect-clear-icon',
    dropdown: 'p-cascadeselect-dropdown',
    loadingIcon: 'p-cascadeselect-loading-icon',
    dropdownIcon: 'p-cascadeselect-dropdown-icon',
    overlay: ({ instance }) => [
        'p-cascadeselect-overlay p-component',
        {
            'p-cascadeselect-mobile-active': instance.queryMatches()
        }
    ],
    listContainer: 'p-cascadeselect-list-container',
    list: 'p-cascadeselect-list',
    option: ({ instance, processedOption }) => [
        'p-cascadeselect-option',
        {
            'p-cascadeselect-option-group': instance.isOptionGroup(processedOption),
            'p-cascadeselect-option-active': instance.isOptionActive(processedOption),
            'p-cascadeselect-option-selected': instance.isOptionSelected(processedOption),
            'p-focus': instance.isOptionFocused(processedOption),
            'p-disabled': instance.isOptionDisabled(processedOption)
        }
    ],
    optionContent: 'p-cascadeselect-option-content',
    optionText: 'p-cascadeselect-option-text',
    groupIcon: 'p-cascadeselect-group-icon',
    optionList: 'p-cascadeselect-list p-cascadeselect-overlay p-cascadeselect-option-list'
};

@Injectable()
export class CascadeSelectStyle extends BaseStyle {
    name = 'cascadeselect';

    theme = theme;

    classes = classes;

    inlineStyles = inlineStyles;
}

/**
 *
 * CascadeSelect is a form component to select a value from a nested structure of options.
 *
 * [Live Demo](https://www.primeng.org/cascadeselect/)
 *
 * @module cascadeselectstyle
 *
 */
export enum CascadeSelectClasses {
    /**
     * Class name of the root element
     */
    root = 'p-cascadeselect',
    /**
     * Class name of the label element
     */
    label = 'p-cascadeselect-label',
    /**
     * Class name of the dropdown element
     */
    dropdown = 'p-cascadeselect-dropdown',
    /**
     * Class name of the loading icon element
     */
    loadingIcon = 'p-cascadeselect-loading-icon',
    /**
     * Class name of the dropdown icon element
     */
    clearIcon = 'p-cascadeselect-clear-icon',
    /**
     * Class name of the dropdown icon element
     */
    dropdownIcon = 'p-cascadeselect-dropdown-icon',
    /**
     * Class name of the overlay element
     */
    overlay = 'p-cascadeselect-overlay',
    /**
     * Class name of the list container element
     */
    listContainer = 'p-cascadeselect-list-container',
    /**
     * Class name of the list element
     */
    list = 'p-cascadeselect-list',
    /**
     * Class name of the item element
     */
    item = 'p-cascadeselect-item',
    /**
     * Class name of the item content element
     */
    itemContent = 'p-cascadeselect-item-content',
    /**
     * Class name of the item text element
     */
    itemText = 'p-cascadeselect-item-text',
    /**
     * Class name of the group icon element
     */
    groupIcon = 'p-cascadeselect-group-icon',
    /**
     * Class name of the item list element
     */
    itemList = 'p-cascadeselect-item-list'
}

export interface CascadeSelectStyle extends BaseStyle {}
