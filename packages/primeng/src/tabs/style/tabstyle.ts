import { Injectable } from '@angular/core';
import { BaseStyle } from 'primeng/base';

const classes = {
    root: ({ instance }) => [
        'p-tab',
        {
            'p-tab-active': instance.active(),
            'p-disabled': instance.disabled()
        }
    ]
};

@Injectable()
export class TabStyle extends BaseStyle {
    name = 'tab';

    classes = classes;
}

/**
 *
 * Tabs facilitates seamless switching between different views.
 *
 * [Live Demo](https://www.primeng.org/tabs/)
 *
 * @module tabsstyle
 *
 */

export enum TabClasses {
    /**
     * Class name of the tab list element
     */
    tab = 'p-tab'
}

export interface TabStyle extends BaseStyle {}
