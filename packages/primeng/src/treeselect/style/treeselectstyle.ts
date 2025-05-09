import { Injectable } from '@angular/core';
import { style } from '@primeuix/styles/treeselect';
import { BaseStyle } from 'primeng/base';

const inlineStyles = {
    root: ({ instance }) => ({ position: instance.appendTo === 'self' ? 'relative' : undefined, ...instance.containerStyle })
};

const classes = {
    root: ({ instance }) => [
        'p-treeselect p-component p-inputwrapper',
        instance.containerStyleClass,
        {
            'p-treeselect-display-chip': instance.display === 'chip',
            'p-disabled': instance.disabled,
            'p-invalid': instance.invalid,
            'p-focus': instance.focused,
            'p-variant-filled': instance.variant === 'filled' || instance.config.inputVariant() === 'filled' || instance.config.inputStyle() === 'filled',
            'p-inputwrapper-filled': !instance.emptyValue,
            'p-inputwrapper-focus': instance.focused || instance.overlayVisible,
            'p-treeselect-open': instance.overlayVisible,
            'p-treeselect-clearable': instance.showClear,
            'p-treeselect-fluid': instance.hasFluid,
            'p-treeselect-sm p-inputfield-sm': instance.size === 'small',
            'p-treeselect-lg p-inputfield-lg': instance.size === 'large'
        }
    ],
    labelContainer: 'p-treeselect-label-container',
    label: ({ instance }) => [
        'p-treeselect-label',
        instance.labelStyleClass,
        {
            'p-placeholder': instance.label === instance.placeholder,
            'p-treeselect-label-empty': !instance.placeholder && instance.emptyValue
        }
    ],
    chip: 'p-treeselect-chip-item',
    pcChip: 'p-treeselect-chip',
    dropdown: 'p-treeselect-dropdown',
    dropdownIcon: 'p-treeselect-dropdown-icon',
    panel: ({ instance }) => ['p-treeselect-overlay p-component', instance.panelStyleClass, instance.panelClass],
    treeContainer: 'p-treeselect-tree-container',
    emptyMessage: 'p-treeselect-empty-message'
};

@Injectable()
export class TreeSelectStyle extends BaseStyle {
    name = 'treeselect';

    theme = style;

    classes = classes;

    inlineStyles = inlineStyles;
}

/**
 *
 * TreeSelect is a form component to choose from hierarchical data.
 *
 * [Live Demo](https://www.primeng.org/treeselect/)
 *
 * @module treeselectstyle
 *
 */
export enum TreeSelectClasses {
    /**
     * Class name of the root element
     */
    root = 'p-treeselect',
    /**
     * Class name of the label container element
     */
    labelContainer = 'p-treeselect-label-container',
    /**
     * Class name of the label element
     */
    label = 'p-treeselect-label',
    /**
     * Class name of the chip item element
     */
    chipItem = 'p-treeselect-chip-item',
    /**
     * Class name of the chip element
     */
    pcChip = 'p-treeselect-chip',
    /**
     * Class name of the dropdown element
     */
    dropdown = 'p-treeselect-dropdown',
    /**
     * Class name of the dropdown icon element
     */
    dropdownIcon = 'p-treeselect-dropdown-icon',
    /**
     * Class name of the panel element
     */
    panel = 'p-treeselect-overlay',
    /**
     * Class name of the tree container element
     */
    treeContainer = 'p-treeselect-tree-container',
    /**
     * Class name of the empty message element
     */
    emptyMessage = 'p-treeselect-empty-message'
}

export interface TreeSelectStyle extends BaseStyle {}
