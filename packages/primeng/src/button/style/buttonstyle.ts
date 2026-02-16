import { Injectable } from '@angular/core';
import { style } from '@primeuix/styles/button';
import { BaseStyle } from 'primeng/base';

const classes = {
    root: ({ instance }) => {
        const hasIcon = instance.hasIcon();
        const label = instance.label();
        const buttonProps = instance.buttonProps();
        const loading = instance.loading();
        const link = instance.link();
        const severity = instance.severity();
        const raised = instance.raised();
        const rounded = instance.rounded();
        const text = instance.text();
        const variant = instance.variant();
        const outlined = instance.outlined();
        const size = instance.size();
        const plain = instance.plain();
        const badge = instance.badge();
        const hasFluid = instance.hasFluid();
        const iconPos = instance.iconPos();

        return [
            'p-button p-component',
            {
                'p-button-icon-only': hasIcon && !label && !buttonProps?.label && !badge,
                'p-button-vertical': (iconPos === 'top' || iconPos === 'bottom') && label,
                'p-button-loading': loading || buttonProps?.loading,
                'p-button-link': link || buttonProps?.link,
                [`p-button-${severity || buttonProps?.severity}`]: severity || buttonProps?.severity,
                'p-button-raised': raised || buttonProps?.raised,
                'p-button-rounded': rounded || buttonProps?.rounded,
                'p-button-text': text || variant === 'text' || buttonProps?.text || buttonProps?.variant === 'text',
                'p-button-outlined': outlined || variant === 'outlined' || buttonProps?.outlined || buttonProps?.variant === 'outlined',
                'p-button-sm': size === 'small' || buttonProps?.size === 'small',
                'p-button-lg': size === 'large' || buttonProps?.size === 'large',
                'p-button-plain': plain || buttonProps?.plain,
                'p-button-fluid': hasFluid
            }
        ];
    },
    loadingIcon: 'p-button-loading-icon',
    icon: ({ instance }) => {
        const iconPos = instance.iconPos();
        const buttonProps = instance.buttonProps();
        const label = instance.label();
        const icon = instance.icon();

        return [
            'p-button-icon',
            {
                [`p-button-icon-${iconPos || buttonProps?.iconPos}`]: label || buttonProps?.label,
                'p-button-icon-left': ((iconPos === 'left' || buttonProps?.iconPos === 'left') && label) || buttonProps?.label,
                'p-button-icon-right': ((iconPos === 'right' || buttonProps?.iconPos === 'right') && label) || buttonProps?.label,
                'p-button-icon-top': ((iconPos === 'top' || buttonProps?.iconPos === 'top') && label) || buttonProps?.label,
                'p-button-icon-bottom': ((iconPos === 'bottom' || buttonProps?.iconPos === 'bottom') && label) || buttonProps?.label
            },
            icon,
            buttonProps?.icon
        ];
    },
    spinnerIcon: ({ instance }) => {
        return Object.entries(instance.cx('icon'))
            .filter(([, value]) => !!value)
            .reduce((acc, [key]) => acc + ` ${key}`, 'p-button-loading-icon');
    },
    label: 'p-button-label'
};

@Injectable()
export class ButtonStyle extends BaseStyle {
    name = 'button';

    style = style;

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
