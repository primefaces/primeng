import { Injectable } from '@angular/core';
import { style } from '@primeuix/styles/speeddial';
import { BaseStyle } from 'primeng/base';

/* Direction */
const inlineStyles = {
    root: ({ instance }) => ({
        alignItems: (instance.direction === 'up' || instance.direction === 'down') && 'center',
        justifyContent: (instance.direction === 'left' || instance.direction === 'right') && 'center',
        flexDirection: instance.direction === 'up' ? 'column-reverse' : instance.direction === 'down' ? 'column' : instance.direction === 'left' ? 'row-reverse' : instance.direction === 'right' ? 'row' : null
    }),
    list: ({ instance }) => ({
        flexDirection: instance.direction === 'up' ? 'column-reverse' : instance.direction === 'down' ? 'column' : instance.direction === 'left' ? 'row-reverse' : instance.direction === 'right' ? 'row' : null
    })
};

const classes = {
    root: ({ instance }) => [
        `p-speeddial p-component p-speeddial-${instance.type}`,
        {
            [`p-speeddial-direction-${instance.direction}`]: instance.type !== 'circle',
            'p-speeddial-open': instance.visible,
            'p-disabled': instance.disabled
        }
    ],
    pcButton: ({ instance }) => [
        'p-button-icon-only p-speeddial-button p-button-rounded',
        {
            'p-speeddial-rotate': instance.rotateAnimation && !instance.hideIcon
        }
    ],
    list: 'p-speeddial-list',
    item: ({ instance, item, i }) => ['p-speeddial-item', { 'p-hidden': item.visible === false, 'p-focus': instance.focusedOptionId == instance.id + '_' + i }],
    action: 'p-speeddial-action',
    actionIcon: 'p-speeddial-action-icon',
    mask: ({ instance }) => [
        'p-speeddial-mask',
        {
            'p-speeddial-mask-visible': instance.visible
        }
    ]
};

@Injectable()
export class SpeedDialStyle extends BaseStyle {
    name = 'speeddial';

    theme = style;

    classes = classes;

    inlineStyles = inlineStyles;
}

/**
 *
 * When pressed, a floating action button can display multiple primary actions that can be performed on a page.
 *
 * [Live Demo](https://www.primeng.org/speeddial/)
 *
 * @module speeddialstyle
 *
 */
export enum SpeedDialClasses {
    /**
     * Class name of the root element
     */
    root = 'p-speeddial',
    /**
     * Class name of the button element
     */
    pcButton = 'p-speeddial-button',
    /**
     * Class name of the list element
     */
    list = 'p-speeddial-list',
    /**
     * Class name of the item element
     */
    item = 'p-speeddial-item',
    /**
     * Class name of the action element
     */
    action = 'p-speeddial-action',
    /**
     * Class name of the action icon element
     */
    actionIcon = 'p-speeddial-action-icon',
    /**
     * Class name of the mask element
     */
    mask = 'p-speeddial-mask'
}

export interface SpeedDialStyle extends BaseStyle {}
