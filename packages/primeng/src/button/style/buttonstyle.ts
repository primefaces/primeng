import { Injectable } from '@angular/core';
import { style } from '@primeuix/styles/button';
import { BaseStyle } from 'primeng/base';

const classes = {
    root: ({ instance }) => [
        'p-button p-component',
        {
            'p-button-icon-only': (instance.icon || instance.iconTemplate || instance._iconTemplate || instance.loadingIcon || instance.loadingIconTemplate || instance._loadingIconTemplate) && !instance.label,
            'p-button-vertical': (instance.iconPos === 'top' || instance.iconPos === 'bottom') && instance.label,
            'p-button-loading': instance.loading,
            'p-button-link': instance.link,
            [`p-button-${instance.severity}`]: instance.severity,
            'p-button-raised': instance.raised,
            'p-button-rounded': instance.rounded,
            'p-button-text': instance.text || instance.variant === 'text',
            'p-button-outlined': instance.outlined || instance.variant === 'outlined',
            'p-button-sm': instance.size === 'small',
            'p-button-lg': instance.size === 'large',
            'p-button-plain': instance.plain,
            'p-button-fluid': instance.hasFluid
        }
    ],
    loadingIcon: 'p-button-loading-icon',
    icon: ({ instance }) => [
        'p-button-icon',
        {
            [`p-button-icon-${instance.iconPos}`]: instance.label,
            'p-button-icon-left': instance.iconPos === 'left' && instance.label,
            'p-button-icon-right': instance.iconPos === 'right' && instance.label
        },
        instance.icon
    ],
    spinnerIcon: ({ instance }) => {
        return Object.entries(instance.iconClass())
            .filter(([, value]) => !!value)
            .reduce((acc, [key]) => acc + ` ${key}`, 'p-button-loading-icon');
    },
    label: 'p-button-label'
};

@Injectable()
export class ButtonStyle extends BaseStyle {
    name = 'button';

    theme = style;

    classes = classes;
}

/**
 *
 * Button is an extension to standard button element with icons and theming.
 *
 * [Live Demo](https://www.primeng.org/button/)
 *
 * @module buttonstyle
 *
 */
export enum ButtonClasses {
    /**
     * Class name of the root element
     */
    root = 'p-button',
    /**
     * Class name of the loading icon element
     */
    loadingIcon = 'p-button-loading-icon',
    /**
     * Class name of the icon element
     */
    icon = 'p-button-icon',
    /**
     * Class name of the label element
     */
    label = 'p-button-label'
}

export interface ButtonStyle extends BaseStyle {}
