import { TemplateRef } from '@angular/core';
import { PassThrough, PassThroughOption } from 'primeng/api';
import { ScrollPanel } from './scrollpanel';
/**
 * Defines passthrough(pt) options type in component.
 */
export declare type ScrollPanelPassThroughOption<E> = PassThroughOption<E, ScrollPanel>;

/**
 * Custom passthrough(pt) options.
 * @see {@link ScrollPanelProps.pt}
 */
export interface ScrollPanelPassThroughOptions {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: ScrollPanelPassThroughOption<HTMLDivElement>;
    /**
     * Used to pass attributes to the content container's DOM element.
     */
    contentContainer?: ScrollPanelPassThroughOption<HTMLDivElement>;
    /**
     * Used to pass attributes to the content's DOM element.
     */
    content?: ScrollPanelPassThroughOption<HTMLDivElement>;
    /**
     * Used to pass attributes to the horizontal panel's DOM element.
     */
    barX?: ScrollPanelPassThroughOption<HTMLDivElement>;
    /**
     * Used to pass attributes to the vertical panel's DOM element.
     */
    barY?: ScrollPanelPassThroughOption<HTMLDivElement>;
}

export type ScrollPanelPassThrough = PassThrough<ScrollPanel, ScrollPanelPassThroughOptions>;

/**
 * Defines valid templates in ScrollPanel.
 * @group Templates
 */
export interface ScrollPanelTemplates {
    /**
     * Custom content template.
     */
    content(): TemplateRef<any>;
}
