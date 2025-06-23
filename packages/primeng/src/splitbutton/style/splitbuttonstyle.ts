import { Injectable } from '@angular/core';
import { style } from '@primeuix/styles/splitbutton';
import { BaseStyle } from 'primeng/base';

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

    theme = style;

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
