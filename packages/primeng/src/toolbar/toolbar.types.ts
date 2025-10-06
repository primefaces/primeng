import { TemplateRef } from '@angular/core';
import { PassThrough, PassThroughOption } from 'primeng/api';
import { Toolbar } from './toolbar';
/**
 * Defines passthrough(pt) options type in component.
 */
export declare type ToolbarPassThroughOption<E> = PassThroughOption<E, Toolbar>;

/**
 * Custom passthrough(pt) options.
 * @see {@link ToolbarProps.pt}
 */
export interface ToolbarPassThroughOptions {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: ToolbarPassThroughOption<HTMLElement>;
    /**
     * Used to pass attributes to the start's DOM element.
     */
    start?: ToolbarPassThroughOption<HTMLDivElement>;
    /**
     * Used to pass attributes to the center's DOM element.
     */
    center?: ToolbarPassThroughOption<HTMLDivElement>;
    /**
     * Used to pass attributes to the right's DOM element.
     */
    end?: ToolbarPassThroughOption<HTMLDivElement>;
}

export type ToolbarPassThrough = PassThrough<Toolbar, ToolbarPassThroughOptions>;

/**
 * Defines valid templates in Toolbar.
 * @group Templates
 */
export interface ToolbarTemplates {
    /**
     * Custom start content.
     */
    start(): TemplateRef<any>;
    /**
     * Custom end content.
     */
    end(): TemplateRef<any>;
    /**
     * Custom center content.
     */
    center(): TemplateRef<any>;
}
