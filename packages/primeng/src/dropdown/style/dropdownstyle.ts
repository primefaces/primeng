import { Injectable } from '@angular/core';
import { css, dt } from '@primeuix/styled';
import { style } from '@primeuix/styles/select';
import { BaseStyle } from 'primeng/base';
/**
 *
 * Dropdown also known as Select, is used to choose an item from a collection of options.
 *
 * [Live Demo](https://www.primeng.org/select/)
 *
 * @module dropdownstyle
 *
 */
import type { SelectStyle } from 'primeng/select';

const theme = css`
    ${style}

    /* For PrimeNG */
    .p-select.ng-invalid.ng-dirty {
        border-color: ${dt('select.invalid.border.color')};
    }
`;

const classes = {
    root: ({ instance }) => [
        'p-select p-component p-inputwrapper',
        instance.styleClass,
        {
            'p-disabled': instance.disabled,
            'p-variant-filled': instance.variant === 'filled' || instance.config.inputVariant() === 'filled' || instance.config.inputStyle() === 'filled',
            'p-focus': instance.focused,
            'p-inputwrapper-filled': instance.modelValue() !== undefined && instance.modelValue() !== null,
            'p-inputwrapper-focus': instance.focused || instance.overlayVisible,
            'p-select-open': instance.overlayVisible,
            'p-select-fluid': instance.hasFluid,
            'p-select-sm p-inputfield-sm': instance.size === 'small',
            'p-select-lg p-inputfield-lg': instance.size === 'large'
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
export class DropdownStyle extends BaseStyle {
    name = 'select';

    theme = theme;

    classes = classes;
}

export enum DropdownClasses {}

export interface DropdownStyle extends SelectStyle {}
