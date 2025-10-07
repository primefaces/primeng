import { TemplateRef } from '@angular/core';
import type { PassThrough, PassThroughOption } from 'primeng/api';

/**
 * Custom pass-through(pt) options.
 * @template I Type of instance.
 *
 * @see {@link SplitterProps.pt}
 * @group Interface
 */
export interface SplitterPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass attributes to the panel's DOM element.
     */
    panel: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the gutter's DOM element.
     */
    gutter?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the gutter handle's DOM element.
     */
    gutterHandle?: PassThroughOption<HTMLDivElement, I>;
}

/**
 * Defines valid pass-through options in Splitter component.
 * @see {@link SplitterPassThroughOptions}
 *
 * @template I Type of instance.
 */
export type SplitterPassThrough<I = unknown> = PassThrough<I, SplitterPassThroughOptions<I>>;

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
