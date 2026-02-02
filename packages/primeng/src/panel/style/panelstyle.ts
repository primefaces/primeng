import { Injectable } from '@angular/core';
import { style } from '@primeuix/styles/panel';
import { BaseStyle } from 'primeng/base';

const classes = {
    root: ({ instance }) => {
        const toggleable = instance.toggleable();
        const collapsed = instance.collapsed();
        return [
            'p-panel p-component',
            {
                'p-panel-toggleable': toggleable,
                'p-panel-expanded': !collapsed && toggleable,
                'p-panel-collapsed': collapsed && toggleable
            }
        ];
    },
    header: 'p-panel-header',
    title: 'p-panel-title',
    headerActions: ({ instance }) => {
        const iconPos = instance.iconPos();
        return [
            'p-panel-header-actions',
            {
                'p-panel-icons-start': iconPos === 'start',
                'p-panel-icons-end': iconPos === 'end',
                'p-panel-icons-center': iconPos === 'center'
            }
        ];
    },
    pcToggleButton: 'p-panel-toggle-button',
    contentContainer: 'p-panel-content-container',
    contentWrapper: 'p-panel-content-wrapper',
    content: 'p-panel-content',
    footer: 'p-panel-footer'
};
@Injectable()
export class PanelStyle extends BaseStyle {
    name = 'panel';

    style = style;

    classes = classes;
}

/**
 *
 * Panel is a container with the optional content toggle feature.
 *
 * [Live Demo](https://www.primeng.org/panel/)
 *
 * @module panelstyle
 *
 */
export enum PanelClasses {
    /**
     * Class name of the root element
     */
    root = 'p-panel',
    /**
     * Class name of the header element
     */
    header = 'p-panel-header',
    /**
     * Class name of the title element
     */
    title = 'p-panel-title',
    /**
     * Class name of the header actions element
     */
    headerActions = 'p-panel-header-actions',
    /**
     * Class name of the toggle button element
     */
    pcToggleButton = 'p-panel-toggle-button',
    /**
     * Class name of the content container element
     */
    contentContainer = 'p-panel-content-container',
    /**
     * Class name of the content wrapper element
     */
    contentWrapper = 'p-panel-content-wrapper',
    /**
     * Class name of the content element
     */
    content = 'p-panel-content',
    /**
     * Class name of the footer element
     */
    footer = 'p-panel-footer'
}
