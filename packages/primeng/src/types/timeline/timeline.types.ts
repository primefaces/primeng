import type { PassThrough, PassThroughOption } from 'primeng/api';
import { TemplateRef } from '@angular/core';
import type { Timeline } from 'primeng/timeline';

/**
 * Custom pass-through(pt) options.
 * @template I Type of instance.
 *
 * @see {@link Timeline.pt}
 * @group Interface
 */
export interface TimelinePassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the host's DOM element.
     */
    host?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the event's DOM element.
     */
    event?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the event opposite's DOM element.
     */
    eventOpposite?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the event separator's DOM element.
     */
    eventSeparator?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the event marker's DOM element.
     */
    eventMarker?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the event connector's DOM element.
     */
    eventConnector?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the event content's DOM element.
     */
    eventContent?: PassThroughOption<HTMLDivElement, I>;
}

/**
 * Defines valid pass-through options in Timeline.
 * @see {@link TimelinePassThroughOptions}
 *
 * @template I Type of instance.
 */
export type TimelinePassThrough<I = unknown> = PassThrough<I, TimelinePassThroughOptions<I>>;

/**
 * Defines valid templates in Timeline.
 * @group Templates
 */
export interface TimelineTemplates {
    /**
     * Custom content template.
     * @param {Object} context - item data.
     */
    content(context: {
        /**
         * Item instance.
         */
        $implicit: any;
    }): TemplateRef<{ $implicit: any }>;
    /**
     * Custom opposite item template.
     * @param {Object} context - item data.
     */
    opposite(context: {
        /**
         * Item instance.
         */
        $implicit: any;
    }): TemplateRef<{ $implicit: any }>;
    /**
     * Custom marker template.
     * @param {Object} context - item data.
     */
    marker(context: {
        /**
         * Item instance.
         */
        $implicit: any;
    }): TemplateRef<{ $implicit: any }>;
}
