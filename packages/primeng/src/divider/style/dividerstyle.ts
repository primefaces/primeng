import { Injectable } from '@angular/core';
import { style } from '@primeuix/styles/divider';
import { BaseStyle } from 'primeng/base';

/* Position */
const inlineStyles = {
    root: ({ instance }) => {
        const layout = instance.layout();
        const align = instance.align();
        return {
            justifyContent: layout === 'horizontal' ? (align === 'center' || align == null ? 'center' : align === 'left' ? 'flex-start' : align === 'right' ? 'flex-end' : null) : null,
            alignItems: layout === 'vertical' ? (align === 'center' || align == null ? 'center' : align === 'top' ? 'flex-start' : align === 'bottom' ? 'flex-end' : null) : null
        };
    }
};

const classes = {
    root: ({ instance }) => {
        const layout = instance.layout();
        const type = instance.type();
        const align = instance.align();
        return [
            'p-divider p-component',
            'p-divider-' + layout,
            'p-divider-' + type,
            { 'p-divider-left': layout === 'horizontal' && (!align || align === 'left') },
            { 'p-divider-center': layout === 'horizontal' && align === 'center' },
            { 'p-divider-right': layout === 'horizontal' && align === 'right' },
            { 'p-divider-top': layout === 'vertical' && align === 'top' },
            { 'p-divider-center': layout === 'vertical' && (!align || align === 'center') },
            { 'p-divider-bottom': layout === 'vertical' && align === 'bottom' }
        ];
    },
    content: 'p-divider-content'
};

@Injectable()
export class DividerStyle extends BaseStyle {
    name = 'divider';

    style = style;

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
