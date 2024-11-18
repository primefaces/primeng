import { Injectable } from '@angular/core';
import { BaseStyle } from 'primeng/base';

const theme = ({ dt }) => `
.p-cascadeselect {
    display: inline-flex;
    cursor: pointer;
    position: relative;
    user-select: none;
    background: ${dt('cascadeselect.background')};
    border: 1px solid ${dt('cascadeselect.border.color')};
    transition: background ${dt('cascadeselect.transition.duration')}, color ${dt('cascadeselect.transition.duration')}, border-color ${dt('cascadeselect.transition.duration')}, outline-color ${dt(
        'cascadeselect.transition.duration'
    )}, box-shadow ${dt('cascadeselect.transition.duration')};
    border-radius: ${dt('cascadeselect.border.radius')};
    outline-color: transparent;
    box-shadow: ${dt('cascadeselect.shadow')};
}

.p-cascadeselect:not(.p-disabled):hover {
    border-color: ${dt('cascadeselect.hover.border.color')};
}

.p-cascadeselect:not(.p-disabled).p-focus {
    border-color: ${dt('cascadeselect.focus.border.color')};
    box-shadow: ${dt('cascadeselect.focus.ring.shadow')};
    outline: ${dt('cascadeselect.focus.ring.width')} ${dt('cascadeselect.focus.ring.style')} ${dt('cascadeselect.focus.ring.color')};
    outline-offset: ${dt('multiscascadeselectelect.focus.ring.offset')};
}

.p-cascadeselect.p-variant-filled {
    background: ${dt('cascadeselect.filled.background')};
}

.p-cascadeselect.p-variant-filled:not(.p-disabled):hover {
    background: ${dt('cascadeselect.filled.hover.background')};
}

.p-cascadeselect.p-variant-filled.p-focus {
    background: ${dt('cascadeselect.filled.focus.background')};
}

.p-cascadeselect.p-disabled {
    opacity: 1;
    background: ${dt('cascadeselect.disabled.background')};
}

.p-cascadeselect-dropdown {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    background: transparent;
    color: ${dt('cascadeselect.dropdown.color')};
    width: ${dt('cascadeselect.dropdown.width')};
    border-top-right-radius: ${dt('border.radius.md')};
    border-bottom-right-radius: ${dt('border.radius.md')};
}

.p-cascadeselect-label {
    display: block;
    white-space: nowrap;
    overflow: hidden;
    flex: 1 1 auto;
    width: 1%;
    text-overflow: ellipsis;
    cursor: pointer;
    padding: ${dt('cascadeselect.padding.y')} ${dt('cascadeselect.padding.x')};
    background: transparent;
    border: 0 none;
    outline: 0 none;
}

.p-cascadeselect-label.p-placeholder {
    color: ${dt('cascadeselect.placeholder.color')};
}

.p-cascadeselect.p-disabled .p-cascadeselect-label {
    color: ${dt('cascadeselect.disabled.color')};
}

.p-cascadeselect-label-empty {
    overflow: hidden;
    visibility: hidden;
}

.p-cascadeselect-fluid {
    display: flex;
}

.p-cascadeselect-fluid .p-cascadeselect-label {
    width: 1%;
}

.p-cascadeselect-overlay {
    background: ${dt('cascadeselect.overlay.background')};
    color: ${dt('cascadeselect.overlay.color')};
    border: 1px solid ${dt('cascadeselect.overlay.border.color')};
    border-radius: ${dt('cascadeselect.overlay.border.radius')};
    box-shadow: ${dt('cascadeselect.overlay.shadow')};
}

.p-cascadeselect .p-cascadeselect-overlay {
    min-width: 100%;
}

.p-cascadeselect-option-list {
    display: none;
    min-width: 100%;
    position: absolute;
    z-index: 1;
}

.p-cascadeselect-list {
    min-width: 100%;
    margin: 0;
    padding: 0;
    list-style-type: none;
    padding: ${dt('cascadeselect.list.padding')};
    display: flex;
    flex-direction: column;
    gap: ${dt('cascadeselect.list.gap')}
}

.p-cascadeselect-option {
    cursor: pointer;
    font-weight: normal;
    white-space: nowrap;
    border: 0 none;
    color: ${dt('cascadeselect.option.color')};
    background: transparent;
    transition: background ${dt('cascadeselect.transition.duration')}, color ${dt('cascadeselect.transition.duration')}, border-color ${dt('cascadeselect.transition.duration')}, box-shadow ${dt(
        'cascadeselect.transition.duration'
    )}, outline-color ${dt('cascadeselect.transition.duration')};
    border-radius: ${dt('cascadeselect.option.border.radius')};
}

.p-cascadeselect-option-active {
    overflow: visible;
    background: ${dt('cascadeselect.option.focus.background')};
    color: ${dt('cascadeselect.option.focus.color')};
}

.p-cascadeselect-option:not(.p-cascadeselect-option-selected):not(.p-disabled).p-focus {
    background: ${dt('cascadeselect.option.focus.background')};
    color: ${dt('cascadeselect.option.focus.color')};
}

.p-cascadeselect-option:not(.p-cascadeselect-option-selected):not(.p-disabled).p-focus .p-cascadeselect-group-icon {
    color: ${dt('cascadeselect.option.icon.focus.color')};
}

.p-cascadeselect-option-selected {
    background: ${dt('cascadeselect.option.selected.background')};
    color: ${dt('cascadeselect.option.selected.color')};
}

.p-cascadeselect-option-selected.p-focus {
    background: ${dt('cascadeselect.option.selected.focus.background')};
    color: ${dt('cascadeselect.option.selected.focus.color')};
}

.p-cascadeselect-option-active > .p-cascadeselect-option-list {
    display: block;
    left: 100%;
    top: 0;
}

.p-cascadeselect-option-content {
    display: flex;
    align-items: center;
    overflow: hidden;
    position: relative;
    padding: ${dt('cascadeselect.option.padding')};
}

.p-cascadeselect-group-icon {
    margin-left: auto;
    font-size: ${dt('cascadeselect.option.icon.size')};
    width: ${dt('cascadeselect.option.icon.size')};
    height: ${dt('cascadeselect.option.icon.size')};
    color: ${dt('cascadeselect.option.icon.color')};
}


.p-cascadeselect-group-icon:dir(rtl) {
    transform: rotate(180deg);
}

.p-cascadeselect-mobile-active .p-cascadeselect-option-list {
    position: static;
    box-shadow: none;
    border: 0 none;
    padding-inline-start: ${dt('tieredmenu.submenu.mobile.indent')};
    padding-inline-end: 0;
}

.p-cascadeselect-mobile-active .p-cascadeselect-group-icon {
    transition: transform 0.2s;
    transform: rotate(90deg);
}

.p-cascadeselect-mobile-active .p-cascadeselect-option-active > .p-cascadeselect-option-content .p-cascadeselect-group-icon {
    transform: rotate(-90deg);
}

.p-cascadeselect-sm .p-cascadeselect-label {
    font-size: ${dt('cascadeselect.sm.font.size')};
    padding-block: ${dt('cascadeselect.sm.padding.y')};
    padding-inline: ${dt('cascadeselect.sm.padding.x')};
}

.p-cascadeselect-sm .p-cascadeselect-dropdown .p-icon {
    font-size: ${dt('cascadeselect.sm.font.size')};
    width: ${dt('cascadeselect.sm.font.size')};
    height: ${dt('cascadeselect.sm.font.size')};
}

.p-cascadeselect-lg .p-cascadeselect-label {
    font-size: ${dt('cascadeselect.lg.font.size')};
    padding-block: ${dt('cascadeselect.lg.padding.y')};
    padding-inline: ${dt('cascadeselect.lg.padding.x')};
}

.p-cascadeselect-lg .p-cascadeselect-dropdown .p-icon {
    font-size: ${dt('cascadeselect.lg.font.size')};
    width: ${dt('cascadeselect.lg.font.size')};
    height: ${dt('cascadeselect.lg.font.size')};
}

/* For PrimeNG */
.p-cascadeselect-clear-icon {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    background: transparent;
    color: ${dt('cascadeselect.clear.icon.color')};
}

p-cascadeselect.ng-invalid.ng-dirty > .p-inputwrapper {
    border-color: ${dt('cascadeselect.invalid.border.color')};
}

p-cascadeselect.ng-invalid.ng-dirty > .p-inputwrapper > .p-cascadeselect-label.p-placeholder {
    color: ${dt('cascadeselect.invalid.placeholder.color')};
}`;

const inlineStyles = {
    root: ({ props }) => ({ position: props.appendTo === 'self' ? 'relative' : undefined })
};

const classes = {
    root: ({ instance, props }) => [
        'p-cascadeselect p-component p-inputwrapper',
        {
            'p-disabled': props.disabled,
            'p-invalid': props.invalid,
            'p-variant-filled': props.variant ? props.variant === 'filled' : instance.config.inputStyle === 'filled' || instance.config.inputVariant === 'filled',
            'p-focus': instance.focused,
            'p-inputwrapper-filled': props.modelValue,
            'p-inputwrapper-focus': instance.focused || instance.overlayVisible,
            'p-cascadeselect-open': instance.overlayVisible,
            'p-cascadeselect-fluid': props.fluid
        }
    ],
    label: ({ instance, props }) => [
        'p-cascadeselect-label',
        {
            'p-placeholder': instance.label === props.placeholder,
            'p-cascadeselect-label-empty': !instance.$slots['value'] && (instance.label === 'p-emptylabel' || instance.label.length === 0)
        }
    ],
    dropdown: 'p-cascadeselect-dropdown',
    loadingIcon: 'p-cascadeselect-loading-icon',
    dropdownIcon: 'p-cascadeselect-dropdown-icon',
    overlay: 'p-cascadeselect-overlay p-component',
    listContainer: 'p-cascadeselect-list-container',
    list: 'p-cascadeselect-list',
    option: ({ instance, processedOption }) => [
        'p-cascadeselect-option',
        {
            'p-cascadeselect-option-active': instance.isOptionActive(processedOption),
            'p-cascadeselect-option-selected': instance.isOptionSelected(processedOption),
            'p-focus': instance.isOptionFocused(processedOption),
            'p-disabled': instance.isOptionDisabled(processedOption)
        }
    ],
    optionContent: 'p-cascadeselect-option-content',
    optionText: 'p-cascadeselect-option-text',
    groupIcon: 'p-cascadeselect-group-icon',
    optionList: 'p-cascadeselect-overlay p-cascadeselect-option-list'
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
