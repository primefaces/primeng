import { Injectable } from '@angular/core';
import { style } from '@primeuix/styles/avatar';
import { BaseStyle } from 'primeng/base';

const classes = {
    root: ({ instance }) => [
        'p-avatar p-component',
        {
            'p-avatar-image': instance.image != null,
            'p-avatar-circle': instance.shape === 'circle',
            'p-avatar-lg': instance.size === 'large',
            'p-avatar-xl': instance.size === 'xlarge'
        }
    ],
    label: 'p-avatar-label',
    icon: 'p-avatar-icon'
};

@Injectable()
export class AvatarStyle extends BaseStyle {
    name = 'avatar';

    theme = style;

    classes = classes;
}

/**
 *
 * Avatar represents people using icons, labels and images.
 *
 * - [Live Demo](https://primeng.org/avatar)
 *
 * @module avatarstyle
 *
 */
export enum AvatarClasses {
    /**
     * Class name of the root element
     */
    root = 'p-avatar',
    /**
     * Class name of the label element
     */
    label = 'p-avatar-label',
    /**
     * Class name of the icon element
     */
    icon = 'p-avatar-icon'
}

export interface AvatarStyle extends BaseStyle {}
