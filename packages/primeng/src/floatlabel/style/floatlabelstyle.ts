import { Injectable } from '@angular/core';
import { BaseStyle } from 'primeng/base';

const theme = ({ dt }) => `
.p-floatlabel {
    display: block;
    position: relative;
}

.p-floatlabel label {
    position: absolute;
    pointer-events: none;
    top: 50%;
    transform: translateY(-50%);
    transition-property: all;
    transition-timing-function: ease;
    line-height: 1;
    font-weight: ${dt('floatlabel.font.weight')};
    left: ${dt('floatlabel.position.x')};
    color: ${dt('floatlabel.color')};
    transition-duration: ${dt('floatlabel.transition.duration')};
}

.p-floatlabel:has(.p-textarea) label {
    top: ${dt('floatlabel.position.y')};
    transform: translateY(0);
}

.p-floatlabel:has(.p-inputicon:first-child) label {
     left: calc((${dt('form.field.padding.x')} * 2) + ${dt('icon.size')});
}

.p-floatlabel:has(.ng-invalid.ng-dirty) label {
    color: ${dt('floatlabel.invalid.color')};
}

.p-floatlabel:has(input:focus) label,
.p-floatlabel:has(input.p-filled) label,
.p-floatlabel:has(input:-webkit-autofill) label,
.p-floatlabel:has(textarea:focus) label,
.p-floatlabel:has(textarea.p-filled) label,
.p-floatlabel:has(.p-inputwrapper-focus) label,
.p-floatlabel:has(.p-inputwrapper-filled) label {
    top: ${dt('floatlabel.over.active.top')};
    transform: translateY(0);
    font-size: ${dt('floatlabel.active.font.size')};
    font-weight: ${dt('floatlabel.label.active.font.weight')};
}

.p-floatlabel:has(input.p-filled) label,
.p-floatlabel:has(textarea.p-filled) label,
.p-floatlabel:has(.p-inputwrapper-filled) label {
    color: ${dt('floatlabel.active.color')};
}

.p-floatlabel:has(input:focus) label,
.p-floatlabel:has(input:-webkit-autofill) label,
.p-floatlabel:has(textarea:focus) label ,
.p-floatlabel:has(.p-inputwrapper-focus) label  {
    color: ${dt('floatlabel.focus.color')};
}

.p-floatlabel-in .p-inputtext,
.p-floatlabel-in .p-textarea,
.p-floatlabel-in .p-select-label,
.p-floatlabel-in .p-multiselect-label-container,
.p-floatlabel-in .p-autocomplete-input-multiple,
.p-floatlabel-in .p-cascadeselect-label,
.p-floatlabel-in .p-treeselect-label {
    padding-top: ${dt('floatlabel.in.input.padding.top')};
}

.p-floatlabel-in:has(input:focus) label,
.p-floatlabel-in:has(input.p-filled) label,
.p-floatlabel-in:has(input:-webkit-autofill) label,
.p-floatlabel-in:has(textarea:focus) label,
.p-floatlabel-in:has(textarea.p-filled) label,
.p-floatlabel-in:has(.p-inputwrapper-focus) label,
.p-floatlabel-in:has(.p-inputwrapper-filled) label {
    top: ${dt('floatlabel.in.active.top')};
}

.p-floatlabel-on:has(input:focus) label,
.p-floatlabel-on:has(input.p-filled) label,
.p-floatlabel-on:has(input:-webkit-autofill) label,
.p-floatlabel-on:has(textarea:focus) label,
.p-floatlabel-on:has(textarea.p-filled) label,
.p-floatlabel-on:has(.p-inputwrapper-focus) label,
.p-floatlabel-on:has(.p-inputwrapper-filled) label {
    top: 0;
    transform: translateY(-50%);
    border-radius: ${dt('floatlabel.on.border.radius')};
    background: ${dt('floatlabel.on.active.background')};
    padding: ${dt('floatlabel.on.active.padding')};
}
`;

const classes = {
    root: ({ instance, props }) => [
        'p-floatlabel',
        {
            'p-floatlabel-over': props.variant === 'over',
            'p-floatlabel-on': props.variant === 'on',
            'p-floatlabel-in': props.variant === 'in'
        }
    ]
};

@Injectable()
export class FloatLabelStyle extends BaseStyle {
    name = 'floatlabel';

    theme = theme;

    classes = classes;
}

/**
 *
 * FloatLabel visually integrates a label with its form element.
 *
 * [Live Demo](https://www.primeng.org/floatlabel/)
 *
 * @module floatlabelstyle
 *
 */
export enum FloatLabelClasses {
    /**
     * Class name of the root element
     */
    root = 'p-floatlabel'
}

export interface FloatLabelStyle extends BaseStyle {}
