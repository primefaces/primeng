import { Injectable } from '@angular/core';
import { css, dt } from '@primeuix/styled';
import { style } from '@primeuix/styles/splitbutton';
import { BaseStyle } from 'primeng/base';

const theme = css`
    ${style}

    /* For PrimeNG */
    .p-splitbutton-button.p-button {
        border-start-end-radius: 0;
        border-end-end-radius: 0;
        border-right: 0 none;
    }

    .p-splitbutton-button.p-button:focus-visible,
    .p-splitbutton-dropdown.p-button:focus-visible {
        z-index: 1;
    }

    .p-splitbutton-button.p-button:not(:disabled):hover,
    .p-splitbutton-button.p-button:not(:disabled):active {
        border-right: 0 none;
    }

    .p-splitbutton-dropdown.p-button {
        border-start-start-radius: 0;
        border-end-start-radius: 0;
    }

    .p-splitbutton-rounded .p-splitbutton-dropdown {
        border-start-end-radius: ${dt('splitbutton.rounded.border.radius')};
        border-end-end-radius: ${dt('splitbutton.rounded.border.radius')};
    }

    .p-splitbutton-rounded > .p-splitbutton-button {
        border-start-start-radius: ${dt('splitbutton.rounded.border.radius')};
        border-end-start-radius: ${dt('splitbutton.rounded.border.radius')};
    }
`;

const classes = {
    root: ({ instance }) => [
        'p-splitbutton p-component',
        {
            'p-splitbutton-raised': instance.raised,
            'p-splitbutton-rounded': instance.rounded,
            'p-splitbutton-outlined': instance.outlined,
            'p-splitbutton-text': instance.text,
            [`p-splitbutton-${instance.size === 'small' ? 'sm' : 'lg'}`]: instance.size
        }
    ],
    pcButton: 'p-splitbutton-button',
    pcDropdown: 'p-splitbutton-dropdown p-button-icon-only'
};

@Injectable()
export class SplitButtonStyle extends BaseStyle {
    name = 'splitbutton';

    theme = theme;

    classes = classes;
}

/**
 *
 * SplitButton groups a set of commands in an overlay with a default command.
 *
 * [Live Demo](https://www.primeng.org/splitbutton/)
 *
 * @module splitbuttonstyle
 *
 */
export enum SplitButtonClasses {
    /**
     * Class name of the root element
     */
    root = 'p-splitbutton',
    /**
     * Class name of the button element
     */
    pcButton = 'p-splitbutton-button',
    /**
     * Class name of the dropdown element
     */
    pcDropdown = 'p-splitbutton-dropdown'
}

export interface SplitButtonStyle extends BaseStyle {}
