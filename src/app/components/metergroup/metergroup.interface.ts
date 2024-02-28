import { TemplateRef } from '@angular/core';

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

export interface MeterItem {
    label?: string;
    value?: number;
    color?: string;
    icon?: string;
}
