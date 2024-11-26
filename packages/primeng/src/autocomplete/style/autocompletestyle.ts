import { Injectable } from '@angular/core';
import { BaseStyle } from 'primeng/base';

const theme = ({ dt }) => `
.p-autocomplete {
    display: inline-flex;
}

.p-autocomplete-loader {
    position: absolute;
    top: 50%;
    margin-top: -0.5rem;
    inset-inline-end: ${dt('autocomplete.padding.x')};
}

.p-autocomplete:has(.p-autocomplete-dropdown) .p-autocomplete-loader {
    inset-inline-end: calc(${dt('autocomplete.dropdown.width')} + ${dt('autocomplete.padding.x')});
}

.p-autocomplete:has(.p-autocomplete-dropdown) .p-autocomplete-input {
    flex: 1 1 auto;
    width: 1%;
}

.p-autocomplete:has(.p-autocomplete-dropdown) .p-autocomplete-input,
.p-autocomplete:has(.p-autocomplete-dropdown) .p-autocomplete-input-multiple {
    border-start-end-radius: 0;
    border-end-end-radius: 0;
}

.p-autocomplete-dropdown {
    cursor: pointer;
    display: inline-flex;
    user-select: none;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;
    width: ${dt('autocomplete.dropdown.width')};
    border-start-end-radius: ${dt('autocomplete.dropdown.border.radius')};
    border-end-end-radius: ${dt('autocomplete.dropdown.border.radius')};
    background: ${dt('autocomplete.dropdown.background')};
    border: 1px solid ${dt('autocomplete.dropdown.border.color')};
    border-inline-start: 0 none;
    color: ${dt('autocomplete.dropdown.color')};
    transition: background ${dt('autocomplete.transition.duration')}, color ${dt('autocomplete.transition.duration')}, border-color ${dt('autocomplete.transition.duration')}, outline-color ${dt('autocomplete.transition.duration')}, box-shadow ${dt(
        'autocomplete.transition.duration'
    )};
    outline-color: transparent;
}

.p-autocomplete-dropdown:not(:disabled):hover {
    background: ${dt('autocomplete.dropdown.hover.background')};
    border-color: ${dt('autocomplete.dropdown.hover.border.color')};
    color: ${dt('autocomplete.dropdown.hover.color')};
}

.p-autocomplete-dropdown:not(:disabled):active {
    background: ${dt('autocomplete.dropdown.active.background')};
    border-color: ${dt('autocomplete.dropdown.active.border.color')};
    color: ${dt('autocomplete.dropdown.active.color')};
}

.p-autocomplete-dropdown:focus-visible {
    box-shadow: ${dt('autocomplete.dropdown.focus.ring.shadow')};
    outline: ${dt('autocomplete.dropdown.focus.ring.width')} ${dt('autocomplete.dropdown.focus.ring.style')} ${dt('autocomplete.dropdown.focus.ring.color')};
    outline-offset: ${dt('autocomplete.dropdown.focus.ring.offset')};
}

.p-autocomplete .p-autocomplete-overlay {
    min-width: 100%;
}

.p-autocomplete-overlay {
    position: absolute;
    top: 0;
    left: 0;
    background: ${dt('autocomplete.overlay.background')};
    color: ${dt('autocomplete.overlay.color')};
    border: 1px solid ${dt('autocomplete.overlay.border.color')};
    border-radius: ${dt('autocomplete.overlay.border.radius')};
    box-shadow: ${dt('autocomplete.overlay.shadow')};
}

.p-autocomplete-list-container {
    overflow: auto;
}

.p-autocomplete-list {
    margin: 0;
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: ${dt('autocomplete.list.gap')};
    padding: ${dt('autocomplete.list.padding')};
}

.p-autocomplete-option {
    cursor: pointer;
    white-space: nowrap;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    padding: ${dt('autocomplete.option.padding')};
    border: 0 none;
    color: ${dt('autocomplete.option.color')};
    background: transparent;
    transition: background ${dt('autocomplete.transition.duration')}, color ${dt('autocomplete.transition.duration')}, border-color ${dt('autocomplete.transition.duration')};
    border-radius: ${dt('autocomplete.option.border.radius')};
}

.p-autocomplete-option:not(.p-autocomplete-option-selected):not(.p-disabled).p-focus {
    background: ${dt('autocomplete.option.focus.background')};
    color: ${dt('autocomplete.option.focus.color')};
}

.p-autocomplete-option-selected {
    background: ${dt('autocomplete.option.selected.background')};
    color: ${dt('autocomplete.option.selected.color')};
}

.p-autocomplete-option-selected.p-focus {
    background: ${dt('autocomplete.option.selected.focus.background')};
    color: ${dt('autocomplete.option.selected.focus.color')};
}

.p-autocomplete-option-group {
    margin: 0;
    padding: ${dt('autocomplete.option.group.padding')};
    color: ${dt('autocomplete.option.group.color')};
    background: ${dt('autocomplete.option.group.background')};
    font-weight: ${dt('autocomplete.option.group.font.weight')};
}

.p-autocomplete-input-multiple {
    margin: 0;
    list-style-type: none;
    cursor: text;
    overflow: hidden;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding: calc(${dt('autocomplete.padding.y')} / 2) ${dt('autocomplete.padding.x')};
    gap: calc(${dt('autocomplete.padding.y')} / 2);
    color: ${dt('autocomplete.color')};
    background: ${dt('autocomplete.background')};
    border: 1px solid ${dt('autocomplete.border.color')};
    border-radius: ${dt('autocomplete.border.radius')};
    width: 100%;
    transition: background ${dt('autocomplete.transition.duration')}, color ${dt('autocomplete.transition.duration')}, border-color ${dt('autocomplete.transition.duration')}, outline-color ${dt('autocomplete.transition.duration')}, box-shadow ${dt(
        'autocomplete.transition.duration'
    )};
    outline-color: transparent;
    box-shadow: ${dt('autocomplete.shadow')};
}

.p-autocomplete:not(.p-disabled):hover .p-autocomplete-input-multiple {
    border-color: ${dt('autocomplete.hover.border.color')};
}

.p-autocomplete:not(.p-disabled).p-focus .p-autocomplete-input-multiple {
    border-color: ${dt('autocomplete.focus.border.color')};
    box-shadow: ${dt('autocomplete.focus.ring.shadow')};
    outline: ${dt('autocomplete.focus.ring.width')} ${dt('autocomplete.focus.ring.style')} ${dt('autocomplete.focus.ring.color')};
    outline-offset: ${dt('autocomplete.focus.ring.offset')};
}

.p-autocomplete.p-invalid .p-autocomplete-input-multiple {
    border-color: ${dt('autocomplete.invalid.border.color')};
}

.p-variant-filled.p-autocomplete-input-multiple {
    background: ${dt('autocomplete.filled.background')};
}

.p-autocomplete:not(.p-disabled):hover .p-variant-filled.p-autocomplete-input-multiple {
    background: ${dt('autocomplete.filled.hover.background')};
}

.p-autocomplete:not(.p-disabled).p-focus .p-variant-filled.p-autocomplete-input-multiple  {
    background: ${dt('autocomplete.filled.focus.background')};
}

.p-autocomplete.p-disabled .p-autocomplete-input-multiple {
    opacity: 1;
    background: ${dt('autocomplete.disabled.background')};
    color: ${dt('autocomplete.disabled.color')};
}

.p-autocomplete-chip.p-chip {
    padding-block-start: calc(${dt('autocomplete.padding.y')} / 2);
    padding-block-end: calc(${dt('autocomplete.padding.y')} / 2);
    border-radius: ${dt('autocomplete.chip.border.radius')};
}

.p-autocomplete-input-multiple:has(.p-autocomplete-chip) {
    padding-inline-start: calc(${dt('autocomplete.padding.y')} / 2);
    padding-inline-end: calc(${dt('autocomplete.padding.y')} / 2);
}

.p-autocomplete-chip-item.p-focus .p-autocomplete-chip {
    background: ${dt('autocomplete.chip.focus.background')};
    color: ${dt('autocomplete.chip.focus.color')};
}

.p-autocomplete-input-chip {
    flex: 1 1 auto;
    display: inline-flex;
    padding-block-start: calc(${dt('autocomplete.padding.y')} / 2);
    padding-block-end: calc(${dt('autocomplete.padding.y')} / 2);
}

.p-autocomplete-input-chip input {
    border: 0 none;
    outline: 0 none;
    background: transparent;
    margin: 0;
    padding: 0;
    box-shadow: none;
    border-radius: 0;
    width: 100%;
    font-family: inherit;
    font-feature-settings: inherit;
    font-size: 1rem;
    color: inherit;
}

.p-autocomplete-input-chip input::placeholder {
    color: ${dt('autocomplete.placeholder.color')};
}

.p-autocomplete-empty-message {
    padding: ${dt('autocomplete.empty.message.padding')};
}

.p-autocomplete-fluid {
    display: flex;
}

.p-autocomplete-fluid:has(.p-autocomplete-dropdown) .p-autocomplete-input {
    width: 1%;
}

.p-autocomplete:has(.p-inputtext-sm) .p-autocomplete-dropdown {
    width: ${dt('autocomplete.dropdown.sm.width')};
}

.p-autocomplete:has(.p-inputtext-sm) .p-autocomplete-dropdown .p-icon {
    font-size: ${dt('form.field.sm.font.size')};
    width: ${dt('form.field.sm.font.size')};
    height: ${dt('form.field.sm.font.size')};
}

.p-autocomplete:has(.p-inputtext-lg) .p-autocomplete-dropdown {
    width: ${dt('autocomplete.dropdown.lg.width')};
}

.p-autocomplete:has(.p-inputtext-lg) .p-autocomplete-dropdown .p-icon {
    font-size: ${dt('form.field.lg.font.size')};
    width: ${dt('form.field.lg.font.size')};
    height: ${dt('form.field.lg.font.size')};
}

/* For PrimeNG */

p-autocomplete.ng-invalid.ng-dirty > .p-autocomplete.p-inputwrapper > .p-autocomplete-input.p-inputtext {
    border-color: ${dt('autocomplete.invalid.border.color')};
}

p-autocomplete.ng-invalid.ng-dirty > .p-autocomplete.p-inputwrapper > .p-autocomplete-input-multiple {
    border-color: ${dt('autocomplete.invalid.border.color')};
}

.p-autocomplete-clear-icon {
    position: absolute;
    top: 50%;
    margin-top: -0.5rem;
    cursor: pointer;
    right: ${dt('autocomplete.padding.x')};
    color: ${dt('autocomplete.dropdown.color')};
}

p-autocomplete.ng-invalid.ng-dirty .p-autocomplete-input-chip input::placeholder {
    color: ${dt('autocomplete.invalid.placeholder.color')};
}

p-autocomplete.ng-invalid.ng-dirty .p-inputtext::placeholder {
    color: ${dt('autocomplete.invalid.placeholder.color')};
}`;

const inlineStyles = {
    root: { position: 'relative' }
};

const classes = {
    root: ({ instance }) => ({
        'p-autocomplete p-component p-inputwrapper': true,
        'p-disabled': instance.disabled,
        'p-focus': instance.focused,
        'p-inputwrapper-filled': instance.filled,
        'p-inputwrapper-focus': (instance.focused && !instance.disabled) || instance.autofocus || instance.overlayVisible,
        'p-autocomplete-open': instance.overlayVisible,
        'p-autocomplete-clearable': instance.showClear && !instance.disabled,
        // 'p-invalid': instance.invalid,
        'p-autocomplete-fluid': instance.hasFluid()
    }),
    pcInput: 'p-autocomplete-input',
    inputMultiple: ({ instance }) => ({
        'p-autocomplete-input-multiple': true,
        'p-variant-filled': instance.variant ? instance.variant === 'filled' : instance.config.inputStyle() === 'filled'
    }),
    chipItem: ({ instance, i }) => [
        'p-autocomplete-chip-item',
        {
            'p-focus': instance.focusedMultipleOptionIndex === i
        }
    ],
    pcChip: 'p-autocomplete-chip',
    chipIcon: 'p-autocomplete-chip-icon',
    inputChip: 'p-autocomplete-input-chip',
    loader: 'p-autocomplete-loader',
    dropdown: 'p-autocomplete-dropdown',
    overlay: 'p-autocomplete-overlay p-component',
    list: 'p-autocomplete-list',
    optionGroup: 'p-autocomplete-option-group',
    option: ({ instance, option, i, getItemOptions }) => ({
        'p-autocomplete-option': true,
        'p-autocomplete-option-selected': instance.isSelected(option),
        'p-focus': instance.focusedOptionIndex === instance.getOptionIndex(i, getItemOptions),
        'p-disabled': instance.isOptionDisabled(option)
    }),
    emptyMessage: 'p-autocomplete-empty-message'
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
    pcInput = 'p-autocomplete-input',
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
    emptyMessage = 'p-autocomplete-empty-message'
}

export interface AutoCompleteStyle extends BaseStyle {}
