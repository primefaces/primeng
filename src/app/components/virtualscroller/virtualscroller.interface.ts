import { TemplateRef } from '@angular/core';
import { VirtualScroller } from './virtualscroller';
import { ScrollerOptions } from 'primeng/scroller';

/**
 * Custom lazy load event.
 * @see {@link VirtualScroller.onLazyLoad}
 */
export interface VirtualScrollerLazyLoadEvent {
    /**
     * Index of the first element in viewport.
     */
    first?: number;
    /**
     * Index of the last element in viewport.
     */
    last?: number;
    /**
     * Row count.
     */
    rows?: number;
    /**
     * Manually triggers change detection.
     */
    forceUpdate?: Function;
}
/**
 * Defines valid templates in VirtualScroller.
 * @group Templates
 */
export interface VirtualScrollerTemplates {
    /**
     * Custom item template.
     * @param {Object} context - item data.
     */
    item(context: {
        /**
         * Item instance.
         */
        $implicit: any;
        /**
         * Scroller options.
         */
        options: ScrollerOptions;
    }): TemplateRef<{ $implicit: any; options: ScrollerOptions }>;
    /**
     * Custom loading item template.
     * @param {Object} context - item data.
     */
    item(context: {
        /**
         * Item instance.
         */
        $implicit: any;
        /**
         * Scroller options.
         */
        options: ScrollerOptions;
    }): TemplateRef<{ $implicit: any; options: ScrollerOptions }>;
    /**
     * Custom header template.
     */
    header: TemplateRef<any>;
    /**
     * Custom header template.
     */
    footer: TemplateRef<any>;
}
