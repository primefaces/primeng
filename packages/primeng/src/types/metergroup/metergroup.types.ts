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
 * Custom label template context.
 * @group Interface
 */
export interface MeterGroupLabelTemplateContext {
    /**
     * Array of meter items.
     */
    $implicit: MeterItem[];
    /**
     * Total percent of the metergroup items.
     */
    totalPercent: number;
    /**
     * Array of sequential sum of values of metergroup items.
     */
    percentages: number[];
}

/**
 * Custom meter template context.
 * @group Interface
 */
export interface MeterGroupMeterTemplateContext {
    /**
     * Current meter item.
     */
    $implicit: MeterItem;
    /**
     * Current index of the meter item.
     */
    index: number;
    /**
     * Current orientation of the component.
     */
    orientation: 'horizontal' | 'vertical';
    /**
     * Style class of the meter item.
     */
    class: string;
    /**
     * Size (width/height percentage) of the meter item.
     */
    size: string;
    /**
     * Total percent of all metergroup items.
     */
    totalPercent: number;
    /**
     * DataP attributes.
     */
    dataP: string;
}

/**
 * Custom icon template context.
 * @group Interface
 */
export interface MeterGroupIconTemplateContext {
    /**
     * Current meter item.
     */
    $implicit: MeterItem;
    /**
     * Icon class of the meter item.
     */
    icon: string | undefined;
}

/**
 * Defines valid templates in MeterGroup.
 * @group Templates
 */
export interface MeterGroupTemplates {
    /**
     * Custom label template.
     * @param {Object} context - label context.
     */
    label(context: MeterGroupLabelTemplateContext): TemplateRef<MeterGroupLabelTemplateContext>;
    /**
     * Custom meter item template.
     * @param {Object} context - meter context.
     */
    meter(context: MeterGroupMeterTemplateContext): TemplateRef<MeterGroupMeterTemplateContext>;
    /**
     * Custom start template.
     * @param {Object} context - start context.
     */
    start(context: MeterGroupLabelTemplateContext): TemplateRef<MeterGroupLabelTemplateContext>;
    /**
     * Custom end template.
     * @param {Object} context - end context.
     */
    end(context: MeterGroupLabelTemplateContext): TemplateRef<MeterGroupLabelTemplateContext>;
    /**
     * Custom icon template.
     * @param {Object} context - icon context.
     */
    icon(context: MeterGroupIconTemplateContext): TemplateRef<MeterGroupIconTemplateContext>;
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
