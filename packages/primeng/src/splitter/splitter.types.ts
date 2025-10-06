import { TemplateRef } from '@angular/core';
import { PassThrough, PassThroughOption } from 'primeng/api';
import { Splitter } from './splitter';
/**
 * Defines passthrough(pt) options type in component.
 */
export declare type SplitterPassThroughOption<E> = PassThroughOption<E, Splitter>;

/**
 * Custom passthrough(pt) options.
 * @see {@link SplitterProps.pt}
 */
export interface SplitterPassThroughOptions {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: SplitterPassThroughOption<HTMLElement>;
    /**
     * Used to pass attributes to the panel's DOM element.
     */
    panel: SplitterPassThroughOption<HTMLDivElement>;
    /**
     * Used to pass attributes to the gutter's DOM element.
     */
    gutter?: SplitterPassThroughOption<HTMLDivElement>;
    /**
     * Used to pass attributes to the gutter handle's DOM element.
     */
    gutterHandle?: SplitterPassThroughOption<HTMLDivElement>;
}

export type SplitterPassThrough = PassThrough<Splitter, SplitterPassThroughOptions>;

/**
 * Custom panel resize start event.
 * @see {@link Splitter.onResizeStart}
 * @group Events
 */
export interface SplitterResizeStartEvent {
    /**
     * Browser event.
     */
    originalEvent: TouchEvent | MouseEvent;
    /**
     * Sizes of the panels, can be percentages, pixels, rem, or other CSS units.
     */
    sizes: (number | string)[];
}
/**
 * Custom panel resize end event.
 * @see {@link Splitter.onResizeEnd}
 * @extends {SplitterResizeStartEvent}
 * @group Events
 */
export interface SplitterResizeEndEvent extends SplitterResizeStartEvent {}

/**
 * Defines valid templates in Panel.
 * @group Templates
 */
export interface SplitterTemplates {
    /**
     * Custom panel template.
     */
    panel(): TemplateRef<any>;
}
