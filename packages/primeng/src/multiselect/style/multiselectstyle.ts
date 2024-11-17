import { Injectable } from '@angular/core';
import { BaseStyle } from 'primeng/base';

const theme = ({ dt }) => `
.p-multiselect {
    display: inline-flex;
    cursor: pointer;
    position: relative;
    user-select: none;
    background: ${dt('multiselect.background')};
    border: 1px solid ${dt('multiselect.border.color')};
    transition: background ${dt('multiselect.transition.duration')}, color ${dt('multiselect.transition.duration')}, border-color ${dt('multiselect.transition.duration')}, outline-color ${dt('multiselect.transition.duration')}, box-shadow ${dt(
        'multiselect.transition.duration'
    )};
    border-radius: ${dt('multiselect.border.radius')};
    outline-color: transparent;
    box-shadow: ${dt('multiselect.shadow')};
}

.p-multiselect:not(.p-disabled):hover {
    border-color: ${dt('multiselect.hover.border.color')};
}

.p-multiselect:not(.p-disabled).p-focus {
    border-color: ${dt('multiselect.focus.border.color')};
    box-shadow: ${dt('multiselect.focus.ring.shadow')};
    outline: ${dt('multiselect.focus.ring.width')} ${dt('multiselect.focus.ring.style')} ${dt('multiselect.focus.ring.color')};
    outline-offset: ${dt('multiselect.focus.ring.offset')};
}

.p-multiselect.p-variant-filled {
    background: ${dt('multiselect.filled.background')};
}

.p-multiselect.p-variant-filled:not(.p-disabled):hover {
    background: ${dt('multiselect.filled.hover.background')};
}

.p-multiselect.p-variant-filled.p-focus {
    background: ${dt('multiselect.filled.focus.background')};
}

.p-multiselect.p-disabled {
    opacity: 1;
    background: ${dt('multiselect.disabled.background')};
}

.p-multiselect-dropdown {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    background: transparent;
    color: ${dt('multiselect.dropdown.color')};
    width: ${dt('multiselect.dropdown.width')};
    border-top-right-radius: ${dt('multiselect.border.radius')};
    border-bottom-right-radius: ${dt('multiselect.border.radius')};
}

.p-multiselect-label-container {
    overflow: hidden;
    flex: 1 1 auto;
    cursor: pointer;
}

.p-multiselect-label {
    display: flex;
    align-items-center;
    gap: calc(${dt('multiselect.padding.y')} / 2);
    white-space: nowrap;
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: ${dt('multiselect.padding.y')} ${dt('multiselect.padding.x')};
    color: ${dt('multiselect.color')};
}

.p-multiselect-label.p-placeholder {
    color: ${dt('multiselect.placeholder.color')};
}

.p-multiselect.p-disabled .p-multiselect-label {
    color: ${dt('multiselect.disabled.color')};
}

.p-multiselect-label-empty {
    overflow: hidden;
    visibility: hidden;
}

.p-multiselect .p-multiselect-overlay {
    min-width: 100%;
}

.p-multiselect-overlay {
    position: absolute;
    top: 0;
    left: 0;
    background: ${dt('multiselect.overlay.background')};
    color: ${dt('multiselect.overlay.color')};
    border: 1px solid ${dt('multiselect.overlay.border.color')};
    border-radius: ${dt('multiselect.overlay.border.radius')};
    box-shadow: ${dt('multiselect.overlay.shadow')};
}

.p-multiselect-header {
    display: flex;
    align-items: center;
    padding: ${dt('multiselect.list.header.padding')};
}

.p-multiselect-header .p-checkbox {
    margin-right: ${dt('multiselect.option.gap')};
}

.p-multiselect-filter-container {
    flex: 1 1 auto;
}

.p-multiselect-filter {
    width: 100%;
}

.p-multiselect-list-container {
    overflow: auto;
}

.p-multiselect-list {
    margin: 0;
    padding: 0;
    list-style-type: none;
    padding: ${dt('multiselect.list.padding')};
    display: flex;
    flex-direction: column;
    gap: ${dt('multiselect.list.gap')}
}

.p-multiselect-option {
    cursor: pointer;
    font-weight: normal;
    white-space: nowrap;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    gap: ${dt('multiselect.option.gap')};
    padding: ${dt('multiselect.option.padding')};
    border: 0 none;
    color: ${dt('multiselect.option.color')};
    background: transparent;
    transition: background ${dt('multiselect.transition.duration')}, color ${dt('multiselect.transition.duration')}, border-color ${dt('multiselect.transition.duration')}, box-shadow ${dt('multiselect.transition.duration')}, outline-color ${dt(
        'multiselect.transition.duration'
    )};
    border-radius: ${dt('multiselect.option.border.radius')}
}

.p-multiselect-option:not(.p-multiselect-option-selected):not(.p-disabled).p-focus {
    background: ${dt('multiselect.option.focus.background')};
    color: ${dt('multiselect.option.focus.color')};
}

.p-multiselect-option.p-multiselect-option-selected {
    background: ${dt('multiselect.option.selected.background')};
    color: ${dt('multiselect.option.selected.color')};
}

.p-multiselect-option.p-multiselect-option-selected.p-focus {
    background: ${dt('multiselect.option.selected.focus.background')};
    color: ${dt('multiselect.option.selected.focus.color')};
}

.p-multiselect-option-group {
    cursor: auto;
    margin: 0;
    padding: ${dt('multiselect.option.group.padding')};
    background: ${dt('multiselect.option.group.background')};
    color: ${dt('multiselect.option.group.color')};
    font-weight: ${dt('multiselect.option.group.font.weight')};
}

.p-multiselect-empty-message {
    padding: ${dt('multiselect.empty.message.padding')};
}

.p-multiselect-label .p-chip {
    padding-top: calc(${dt('multiselect.padding.y')} / 2);
    padding-bottom: calc(${dt('multiselect.padding.y')} / 2);
    border-radius: ${dt('multiselect.chip.border.radius')};
}

.p-multiselect-label:has(.p-chip) {
    padding: calc(${dt('multiselect.padding.y')} / 2) calc(${dt('multiselect.padding.x')} / 2);
}

.p-multiselect-fluid {
    display: flex;
}

.p-multiselect-sm .p-multiselect-label {
    font-size: ${dt('multiselect.sm.font.size')};
    padding-block: ${dt('multiselect.sm.padding.y')};
    padding-inline: ${dt('multiselect.sm.padding.x')};
}

.p-multiselect-sm .p-multiselect-dropdown .p-icon {
    font-size: ${dt('multiselect.sm.font.size')};
    width: ${dt('multiselect.sm.font.size')};
    height: ${dt('multiselect.sm.font.size')};
}

.p-multiselect-lg .p-multiselect-label {
    font-size: ${dt('multiselect.lg.font.size')};
    padding-block: ${dt('multiselect.lg.padding.y')};
    padding-inline: ${dt('multiselect.lg.padding.x')};
}

.p-multiselect-lg .p-multiselect-dropdown .p-icon {
    font-size: ${dt('multiselect.lg.font.size')};
    width: ${dt('multiselect.lg.font.size')};
    height: ${dt('multiselect.lg.font.size')};
}

/* For PrimeNG */

p-multiselect.ng-invalid.ng-dirty {
    border-color: ${dt('multiselect.invalid.border.color')};
}

.p-multiselect-clear-icon {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    background: transparent;
    color: ${dt('multiselect.clear.icon.color')};
}

p-multiselect.ng-invalid.ng-dirty .p-multiselect-label {
    color: ${dt('multiselect.invalid.placeholder.color')};
}`;

const inlineStyles = {
    root: ({ props }) => ({ position: props.appendTo === 'self' ? 'relative' : undefined })
};

const classes = {
    root: ({ instance }) => ({
        'p-multiselect p-component p-inputwrapper': true,
        'p-multiselect-display-chip': instance.display === 'chip',
        'p-disabled': instance.disabled,
        'p-invalid': instance.invalid,
        'p-variant-filled': instance.variant ? instance.variant === 'filled' : instance.config.inputStyle === 'filled',
        'p-focus': instance.focused,
        'p-inputwrapper-filled': instance.filled,
        'p-inputwrapper-focus': instance.focused || instance.overlayVisible,
        'p-multiselect-open': instance.overlayVisible,
        'p-multiselect-fluid': instance.hasFluid,
        'p-multiselect-sm p-inputfield-sm': instance.size === 'small',
        'p-multiselect-lg p-inputfield-lg': instance.size === 'large'
    }),
    labelContainer: 'p-multiselect-label-container',
    label: ({ instance }) => ({
        'p-multiselect-label': true,
        'p-placeholder': instance.label === instance.placeholder(),
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
    option: ({ instance, option, index, getItemOptions }) => ({
        'p-multiselect-option': true,
        'p-multiselect-option-selected': instance.isSelected(option) && instance.highlightOnSelect,
        'p-focus': instance.focusedOptionIndex === instance.getOptionIndex(index, getItemOptions),
        'p-disabled': instance.isOptionDisabled(option)
    }),
    emptyMessage: 'p-multiselect-empty-message'
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
    emptyMessage = 'p-multiselect-empty-message'
}

export interface MultiSelectStyle extends BaseStyle {}
