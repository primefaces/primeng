import { Injectable } from '@angular/core';
import { style } from '@primeuix/styles/divider';
import { BaseStyle } from 'primeng/base';

/* Position */
const inlineStyles = {
    root: ({ instance }) => ({
        justifyContent: instance.layout === 'horizontal' ? (instance.align === 'center' || instance.align == null ? 'center' : instance.align === 'left' ? 'flex-start' : instance.align === 'right' ? 'flex-end' : null) : null,
        alignItems: instance.layout === 'vertical' ? (instance.align === 'center' || instance.align == null ? 'center' : instance.align === 'top' ? 'flex-start' : instance.align === 'bottom' ? 'flex-end' : null) : null
    })
};

const classes = {
    root: ({ instance }) => [
        'p-divider p-component',
        'p-divider-' + instance.layout,
        'p-divider-' + instance.type,
        { 'p-divider-left': instance.layout === 'horizontal' && (!instance.align || instance.align === 'left') },
        { 'p-divider-center': instance.layout === 'horizontal' && instance.align === 'center' },
        { 'p-divider-right': instance.layout === 'horizontal' && instance.align === 'right' },
        { 'p-divider-top': instance.layout === 'vertical' && instance.align === 'top' },
        { 'p-divider-center': instance.layout === 'vertical' && (!instance.align || instance.align === 'center') },
        { 'p-divider-bottom': instance.layout === 'vertical' && instance.align === 'bottom' }
    ],
    content: 'p-divider-content'
};

@Injectable()
export class DividerStyle extends BaseStyle {
    name = 'divider';

    theme = style;

    classes = classes;

    inlineStyles = inlineStyles;
}

/**
 *
 * Divider is used to separate contents.
 *
 * [Live Demo](https://primeng.org/divider)
 *
 * @module dividerstyle
 *
 */
export enum DividerClasses {
    /**
     * Class name of the root element
     */
    root = 'p-divider',
    /**
     * Class name of the content element
     */
    content = 'p-divider-content'
}

export interface DividerStyle extends BaseStyle {}
