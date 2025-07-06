import { Injectable } from '@angular/core';
import { style } from '@primeuix/styles/listbox';
import { BaseStyle } from 'primeng/base';

const theme = /*css*/ `
    ${style}

    /* For PrimeNG */
    .p-listbox.ng-invalid.ng-dirty {
        border-color: dt('listbox.invalid.border.color');
    }
`;

const classes = {
    root: ({ instance }) => [
        'p-listbox p-component',
        {
            'p-listbox-striped': instance.striped,
            'p-disabled': instance.disabled(),
            'p-invalid': instance.invalid(),
            'p-listbox-fluid': instance.fluid()
        }
    ],
    header: 'p-listbox-header',
    pcFilter: 'p-listbox-filter',
    listContainer: 'p-listbox-list-container',
    list: 'p-listbox-list',
    optionGroup: 'p-listbox-option-group',
    option: ({ instance, option, i, scrollerOptions }) => [
        'p-listbox-option',
        {
            'p-listbox-option-selected': instance.isSelected(option) && instance.highlightOnSelect,
            'p-focus': instance.focusedOptionIndex() === instance.getOptionIndex(i, scrollerOptions),
            'p-disabled': instance.isOptionDisabled(option)
        }
    ],
    optionCheckIcon: 'p-listbox-option-check-icon',
    optionBlankIcon: 'p-listbox-option-blank-icon',
    emptyMessage: 'p-listbox-empty-message'
};

@Injectable()
export class ListBoxStyle extends BaseStyle {
    name = 'listbox';

    theme = theme;

    classes = classes;
}

/**
 *
 * ListBox is used to select one or more values from a list of items.
 *
 * [Live Demo](https://www.primeng.org/listbox/)
 *
 * @module listboxstyle
 *
 */
export enum ListboxClasses {
    /**
     * Class name of the root element
     */
    root = 'p-listbox',
    /**
     * Class name of the header element
     */
    header = 'p-listbox-header',
    /**
     * Class name of the filter element
     */
    pcFilter = 'p-listbox-filter',
    /**
     * Class name of the list container element
     */
    listContainer = 'p-listbox-list-container',
    /**
     * Class name of the list element
     */
    list = 'p-listbox-list',
    /**
     * Class name of the option group element
     */
    optionGroup = 'p-listbox-option-group',
    /**
     * Class name of the option element
     */
    option = 'p-listbox-option',
    /**
     * Class name of the option check icon element
     */
    optionCheckIcon = 'p-listbox-option-check-icon',
    /**
     * Class name of the option blank icon element
     */
    optionBlankIcon = 'p-listbox-option-blank-icon',
    /**
     * Class name of the empty message element
     */
    emptyMessage = 'p-listbox-empty-message'
}

export interface ListboxStyle extends BaseStyle {}
