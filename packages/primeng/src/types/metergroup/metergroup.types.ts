import type { TemplateRef } from '@angular/core';
import type { PassThrough, PassThroughOption } from 'primeng/api';

/**
 * Custom pass-through(pt) options.
 * @template I Type of instance.
 *
 * @see {@link MeterGroup.pt}
 * @group Interface
 */
export interface MeterGroupPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the host's DOM element.
     */
    host?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the meters' DOM element.
     */
    meters?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the meter's DOM element.
     */
    meter?: PassThroughOption<HTMLSpanElement, I>;
    /**
     * Used to pass attributes to the label list's DOM element.
     */
    labelList?: PassThroughOption<HTMLOListElement, I>;
    /**
     * Used to pass attributes to the label's DOM element.
     */
    label?: PassThroughOption<HTMLLIElement, I>;
    /**
     * Used to pass attributes to the label icon's DOM element.
     */
    labelIcon?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass attributes to the label marker's DOM element.
     */
    labelMarker?: PassThroughOption<HTMLSpanElement, I>;
    /**
     * Used to pass attributes to the label text's DOM element.
     */
    labelText?: PassThroughOption<HTMLSpanElement, I>;
}

/**
 * Defines valid pass-through options in MeterGroup.
 * @see {@link MeterGroupPassThroughOptions}
 *
 * @template I Type of instance.
 */
export type MeterGroupPassThrough<I = unknown> = PassThrough<I, MeterGroupPassThroughOptions<I>>;

/**
 * Defines valid templates in MeterGroup.
 * @group Templates
 */
export interface MeterGroupTemplates {
    /**
     * Custom label template.
     */
    label(context: {
        /**
         * Current value of the component.
         */
        $implicit?: MeterItem;
        /**
         * Total percent of the metergroup items.
         */
        totalPercent?: number;
        /**
         * Array of sequential sum of values of metergroup items.
         */
        percentages?: number;
    }): TemplateRef<any>;
    /**
     * Custom meter item template.
     */
    meter(context: {
        /**
         * Current value of the component.
         */
        $implicit?: MeterItem;
        /**
         * Current index of the meter item.
         */
        index?: number;
        /**
         * Style class of the meter item
         */
        class?: string;
        /**
         * Current orientation of the component.
         */
        orientation?: string;
        /**
         * Current width of the meter item.
         */
        size?: string;
        /**
         * Total percent of the metergroup items
         */
        totalPercent?: number;
    }): TemplateRef<any>;
    /**
     * Custom start template.
     */
    start(context: {
        /**
         * Current value of the component.
         */
        $implicit?: MeterItem;
        /**
         * Total percent of the metergroup items.
         */
        totalPercent?: number;
        /**
         * Array of sequential sum of values of metergroup items.
         */
        percentages?: number;
    }): TemplateRef<any>;
    /**
     * Custom start template.
     */
    end(context: {
        /**
         * Current value of the component.
         */
        $implicit?: MeterItem;
        /**
         * Total percent of the metergroup items.
         */
        totalPercent?: number;
        /**
         * Array of sequential sum of values of metergroup items.
         */
        percentages?: number;
    }): TemplateRef<any>;
    /**
     * Custom icon template.
     */
    icon(context: {
        /**
         * Current value of the component.
         */
        $implicit?: MeterItem;
        /**
         * Style class of the icon.
         */
        class?: string;
    }): TemplateRef<any>;
}
/**
 * Represents a meter item configuration.
 * @group Interface
 */
export interface MeterItem {
    /**
     * Label of the meter item.
     */
    label?: string;
    /**
     * Value of the meter item.
     */
    value?: number;
    /**
     * Color of the meter item.
     */
    color?: string;
    /**
     * Icon of the meter item.
     */
    icon?: string;
}
