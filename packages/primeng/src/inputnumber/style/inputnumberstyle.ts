import { Injectable } from '@angular/core';
import { BaseStyle } from 'primeng/base';

const theme = ({ dt }) => `
.p-inputnumber {
    display: inline-flex;
    position: relative;
}

.p-inputnumber-button {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 auto;
    cursor: pointer;
    background: ${dt('inputnumber.button.background')};
    color: ${dt('inputnumber.button.color')};
    width: ${dt('inputnumber.button.width')};
    transition: background ${dt('inputnumber.transition.duration')}, color ${dt('inputnumber.transition.duration')}, border-color ${dt('inputnumber.transition.duration')}, outline-color ${dt('inputnumber.transition.duration')};
}

.p-inputnumber-button:hover {
    background: ${dt('inputnumber.button.hover.background')};
    color: ${dt('inputnumber.button.hover.color')};
}

.p-inputnumber-button:active {
    background: ${dt('inputnumber.button.active.background')};
    color: ${dt('inputnumber.button.active.color')};
}

.p-inputnumber-stacked .p-inputnumber-button {
    position: relative;
    border: 0 none;
}

.p-inputnumber-stacked .p-inputnumber-button-group {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 1px;
    right: 1px;
    height: calc(100% - 2px);
    z-index: 1;
}

.p-inputnumber-stacked .p-inputnumber-increment-button {
    padding: 0;
    border-top-right-radius: calc(${dt('inputnumber.button.border.radius')} - 1px);
}

.p-inputnumber-stacked .p-inputnumber-decrement-button {
    padding: 0;
    border-bottom-right-radius: calc(${dt('inputnumber.button.border.radius')} - 1px);
}

.p-inputnumber-stacked .p-inputnumber-button {
    flex: 1 1 auto;
    border: 0 none;
}

.p-inputnumber-horizontal .p-inputnumber-button {
    border: 1px solid ${dt('inputnumber.button.border.color')};
}

.p-inputnumber-horizontal .p-inputnumber-button:hover {
    border-color: ${dt('inputnumber.button.hover.border.color')};
}

.p-inputnumber-horizontal .p-inputnumber-button:active {
    border-color: ${dt('inputnumber.button.active.border.color')};
}

.p-inputnumber-horizontal .p-inputnumber-increment-button {
    order: 3;
    border-top-right-radius: ${dt('inputnumber.button.border.radius')};
    border-bottom-right-radius: ${dt('inputnumber.button.border.radius')};
    border-left: 0 none;
}

.p-inputnumber-horizontal .p-inputnumber-input {
    order: 2;
    border-radius: 0;
}

.p-inputnumber-horizontal .p-inputnumber-decrement-button {
    order: 1;
    border-top-left-radius: ${dt('inputnumber.button.border.radius')};
    border-bottom-left-radius: ${dt('inputnumber.button.border.radius')};
    border-right: 0 none;
}

.p-floatlabel:has(.p-inputnumber-horizontal) label {
    margin-inline-start: ${dt('inputnumber.button.width')};
}

.p-inputnumber-vertical {
    flex-direction: column;
}

.p-inputnumber-vertical .p-inputnumber-button {
    border: 1px solid ${dt('inputnumber.button.border.color')};
    padding: ${dt('inputnumber.button.vertical.padding')}; 0;
}

.p-inputnumber-vertical .p-inputnumber-button:hover {
    border-color: ${dt('inputnumber.button.hover.border.color')};
}

.p-inputnumber-vertical .p-inputnumber-button:active {
    border-color: ${dt('inputnumber.button.active.border.color')};
}

.p-inputnumber-vertical .p-inputnumber-increment-button {
    order: 1;
    border-top-left-radius: ${dt('inputnumber.button.border.radius')};
    border-top-right-radius: ${dt('inputnumber.button.border.radius')};
    width: 100%;
    border-bottom: 0 none;
}

.p-inputnumber-vertical .p-inputnumber-input {
    order: 2;
    border-radius: 0;
    text-align: center;
}

.p-inputnumber-vertical .p-inputnumber-decrement-button {
    order: 3;
    border-bottom-left-radius: ${dt('inputnumber.button.border.radius')};
    border-bottom-right-radius: ${dt('inputnumber.button.border.radius')};
    width: 100%;
    border-top: 0 none;
}

.p-inputnumber-input {
    flex: 1 1 auto;
}

.p-inputnumber-fluid {
    width: 100%;
}

.p-inputnumber-fluid .p-inputnumber-input {
    width: 1%;
}

.p-inputnumber-fluid.p-inputnumber-vertical .p-inputnumber-input {
    width: 100%;
}

.p-inputnumber:has(.p-inputtext-sm) .p-inputnumber-button .p-icon {
    font-size: ${dt('form.field.sm.font.size')};
    width: ${dt('form.field.sm.font.size')};
    height: ${dt('form.field.sm.font.size')};
}

.p-inputnumber:has(.p-inputtext-lg) .p-inputnumber-button .p-icon {
    font-size: ${dt('form.field.lg.font.size')};
    width: ${dt('form.field.lg.font.size')};
    height: ${dt('form.field.lg.font.size')};
}

/* For PrimeNG */
p-inputnumber.ng-invalid.ng-dirty > .p-inputtext {
    border-color: ${dt('inputtext.invalid.border.color')};
};
`;

const classes = {
    root: ({ instance }) => ({
        'p-inputnumber p-component p-inputwrapper': true,
        'p-inputwrapper-filled': instance.filled || instance.allowEmpty === false,
        'p-inputwrapper-focus': instance.focused,
        'p-inputnumber-stacked': instance.showButtons && instance.buttonLayout === 'stacked',
        'p-inputnumber-horizontal': instance.showButtons && instance.buttonLayout === 'horizontal',
        'p-inputnumber-vertical': instance.showButtons && instance.buttonLayout === 'vertical',
        'p-inputnumber-fluid': instance.hasFluid
    }),
    pcInput: 'p-inputnumber-input',
    buttonGroup: 'p-inputnumber-button-group',
    incrementButton: ({ instance }) => ({
        'p-inputnumber-button p-inputnumber-increment-button': true,
        'p-disabled': instance.showButtons && instance.max !== null && instance.maxlength
    }),
    decrementButton: ({ instance }) => ({
        'p-inputnumber-button p-inputnumber-decrement-button': true,
        'p-disabled': instance.showButtons && instance.min !== null && instance.minlength
    })
};

@Injectable()
export class InputNumberStyle extends BaseStyle {
    name = 'inputnumber';

    theme = theme;

    classes = classes;
}

/**
 *
 * InputNumber is an input component to provide numerical input.
 *
 * [Live Demo](https://www.primeng.org/inputnumber/)
 *
 * @module inputnumberstyle
 *
 */

export enum InputNumberClasses {
    /**
     * Class name of the root element
     */
    root = 'p-inputnumber',
    /**
     * Class name of the input element
     */
    pcInput = 'p-inputnumber-input',
    /**
     * Class name of the button group element
     */
    buttonGroup = 'p-inputnumber-button-group',
    /**
     * Class name of the increment button element
     */
    incrementButton = 'p-inputnumber-increment-button',
    /**
     * Class name of the decrement button element
     */
    decrementButton = 'p-inputnumber-decrement-button'
}

export interface InputNumberStyle extends BaseStyle {}
