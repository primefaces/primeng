import { Injectable } from '@angular/core';
import { BaseStyle } from 'primeng/base';

const theme = ({ dt }) => `
.p-textarea {
    font-family: inherit;
    font-feature-settings: inherit;
    font-size: 1rem;
    color: ${dt('textarea.color')};
    background: ${dt('textarea.background')};
    padding: ${dt('textarea.padding.y')} ${dt('textarea.padding.x')};
    border: 1px solid ${dt('textarea.border.color')};
    transition: background ${dt('textarea.transition.duration')}, color ${dt('textarea.transition.duration')}, border-color ${dt('textarea.transition.duration')}, outline-color ${dt('textarea.transition.duration')}, box-shadow ${dt(
        'textarea.transition.duration'
    )};
    appearance: none;
    border-radius: ${dt('textarea.border.radius')};
    outline-color: transparent;
    box-shadow: ${dt('textarea.shadow')};
}

.p-textarea:enabled:hover {
    border-color: ${dt('textarea.hover.border.color')};
}

.p-textarea:enabled:focus {
    border-color: ${dt('textarea.focus.border.color')};
    box-shadow: ${dt('textarea.focus.ring.shadow')};
    outline: ${dt('textarea.focus.ring.width')} ${dt('textarea.focus.ring.style')} ${dt('textarea.focus.ring.color')};
    outline-offset: ${dt('textarea.focus.ring.offset')};
}

.p-textarea.p-invalid {
    border-color: ${dt('textarea.invalid.border.color')};
}

.p-textarea.p-variant-filled {
    background: ${dt('textarea.filled.background')};
}

.p-textarea.p-variant-filled:enabled:focus {
    background: ${dt('textarea.filled.focus.background')};
}

.p-textarea:disabled {
    opacity: 1;
    background: ${dt('textarea.disabled.background')};
    color: ${dt('textarea.disabled.color')};
}

.p-textarea::placeholder {
    color: ${dt('textarea.placeholder.color')};
}

.p-textarea-fluid {
    width: 100%;
}

.p-textarea-resizable {
    overflow: hidden;
    resize: none;
}

.p-textarea-sm {
    font-size: ${dt('textarea.sm.font.size')};
    padding-block: ${dt('textarea.sm.padding.y')};
    padding-inline: ${dt('textarea.sm.padding.x')};
}

.p-textarea-lg {
    font-size: ${dt('textarea.lg.font.size')};
    padding-block: ${dt('textarea.lg.padding.y')};
    padding-inline: ${dt('textarea.lg.padding.x')};
}

/* For PrimeNG */

.p-textarea.ng-invalid.ng-dirty {
    border-color: ${dt('textarea.invalid.border.color')}
};
`;

const classes = {
    root: ({ instance, props }) => [
        'p-textarea p-component',
        {
            'p-filled': instance.filled,
            'p-textarea-resizable ': props.autoResize,
            'p-invalid': props.invalid,
            'p-variant-filled': props.variant ? props.variant === 'filled' : instance.config.inputStyle === 'filled' || instance.config.inputVariant === 'filled',
            'p-textarea-fluid': props.fluid
        }
    ]
};

@Injectable()
export class TextareaStyle extends BaseStyle {
    name = 'textarea';

    theme = theme;

    classes = classes;
}

/**
 *
 * Textarea is a multi-line text input element.
 *
 * [Live Demo](https://www.primeng.org/textarea/)
 *
 * @module textareastyle
 *
 */
export enum TextareaClasses {
    /**
     * Class name of the root element
     */
    root = 'p-textarea'
}

export interface TextareaStyle extends BaseStyle {}
