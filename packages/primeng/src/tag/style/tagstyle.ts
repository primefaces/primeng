import { Injectable } from '@angular/core';
import { style } from '@primeuix/styles/tag';
import { BaseStyle } from 'primeng/base';

const classes = {
    root: ({ instance }) => {
        const severity = instance.severity();
        const rounded = instance.rounded();
        return [
            'p-tag p-component',
            {
                'p-tag-info': severity === 'info',
                'p-tag-success': severity === 'success',
                'p-tag-warn': severity === 'warn',
                'p-tag-danger': severity === 'danger',
                'p-tag-secondary': severity === 'secondary',
                'p-tag-contrast': severity === 'contrast',
                'p-tag-rounded': rounded
            }
        ];
    },
    icon: 'p-tag-icon',
    label: 'p-tag-label'
};

@Injectable()
export class TagStyle extends BaseStyle {
    name = 'tag';

    style = style;

    classes = classes;
}

/**
 *
 * Tag component is used to categorize content.
 *
 * [Live Demo](https://www.primeng.org/tag)
 *
 * @module tagstyle
 *
 */
export enum TagClasses {
    /**
     * Class name of the root element
     */
    root = 'p-tag',
    /**
     * Class name of the icon element
     */
    icon = 'p-tag-icon',
    /**
     * Class name of the label element
     */
    label = 'p-tag-label'
}

export interface TagStyle extends BaseStyle {}
