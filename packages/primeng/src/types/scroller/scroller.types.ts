import type { PassThrough, PassThroughOption } from 'primeng/api';
import { TemplateRef } from '@angular/core';
import type { Scroller } from 'primeng/scroller';

/**
 * Custom pass-through(pt) options.
 * @template I Type of instance.
 *
 * @see {@link Scroller.pt}
 * @group Interface
 */
export interface ScrollerPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the content's DOM element.
     */
    content?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the spacer's DOM element.
     */
    spacer?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the loader's DOM element.
     */
    loader?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the loading icon's DOM element.
     */
    loadingIcon?: PassThroughOption<HTMLElement, I>;
}

/**
 * Defines valid pass-through options in Scroller.
 * @see {@link ScrollerPassThroughOptions}
 *
 * @template I Type of instance.
 */
export type ScrollerPassThrough<I = unknown> = PassThrough<I, ScrollerPassThroughOptions<I>>;

/**
 * Options of the scroll direction.
 * @group Types
 */
export type ScrollerToType = 'to-start' | 'to-end' | undefined;
/**
 * Options of the scroller orientation.
 * @group Types
 */
export type ScrollerOrientationType = 'vertical' | 'horizontal' | 'both';
/**
 * Loader icon options.
 * @group Types
 */
export interface ScrollerLoaderIconOptions {
    [klass: string]: any;
}
/**
 * Scroller content options.
 * @group Interface
 */
export interface ScrollerContentOptions {
    contentStyleClass?: string;
    items?: any[];
    loading?: boolean;
    itemSize?: number;
    rows?: any[];
    columns?: any[];
    spacerStyle?: { [klass: string]: any } | null | undefined;
    contentStyle?: { [klass: string]: any } | null | undefined;
    vertical?: boolean;
    horizontal?: boolean;
    both?: boolean;
    getItemOptions?: (index: number) => ScrollerItemOptions;
    getLoaderOptions?: (index: number, options?: any) => ScrollerLoaderOptions;
}
/**
 * Scroller item options.
 * @group Interface
 */
export interface ScrollerItemOptions {
    /**
     * Index of the item.
     */
    index?: number;
    /**
     * Item count.
     */
    count?: number;
    /**
     * Index of the first element in viewport.
     */
    first?: boolean;
    /**
     * Index of the last element in viewport.
     */
    last?: boolean;
    /**
     * Defines if index is even number.
     */
    even?: boolean;
    /**
     * Defines if index is odd number.
     */
    odd?: boolean;
}
/**
 * Loader settings.
 * @extends {ScrollerItemOptions}
 * @group Interface
 */
export interface ScrollerLoaderOptions extends ScrollerItemOptions {
    [klass: string]: any;
}
/**
 * Custom lazy load event.
 * @see {@link Scroller.onLazyLoad}
 * @group Events
 */
export interface ScrollerLazyLoadEvent {
    /**
     * First element index in viewport.
     */
    first: number;
    /**
     * Last element index in viewport.
     */
    last: number;
}
/**
 * Custom scroll index change event.
 * @see {@link Scroller.onScrollIndexChange}
 * @extends {ScrollerLazyLoadEvent}
 * @group Events
 */
export interface ScrollerScrollIndexChangeEvent extends ScrollerLazyLoadEvent {}
/**
 * Custom scroll event.
 * @see {@link Scroller.onScroll}
 * @group Events
 */
export interface ScrollerScrollEvent {
    /**
     * Browser event.
     */
    originalEvent?: Event;
}
/**
 * Defines valid templates in Scroller.
 * @group Templates
 */
export interface ScrollerTemplates {
    /**
     * Custom content template.
     * @param {Object} context - Content data.
     */
    content(context: {
        /**
         * Loaded items.
         */
        $implicit: any[] | any | null | undefined;
        /**
         *
         */
        options: ScrollerContentOptions;
    }): TemplateRef<{ $implicit: any[] | any | null | undefined; options: ScrollerContentOptions }>;
    /**
     * Custom item template.
     * @param {Object} context - Item data.
     */
    item(context: {
        /**
         * Item instance.
         */
        $implicit: any;
        /**
         * Scroller item options.
         */
        options: ScrollerItemOptions;
    }): TemplateRef<{ $implicit: any; options: ScrollerItemOptions }>;
    /**
     * Custom loader template.
     * @param {Object} context - Options instance.
     */
    loader(context: {
        /**
         * Options.
         */
        options: ScrollerLoaderOptions;
    }): TemplateRef<{ options: ScrollerLoaderOptions }>;
    /**
     * Custom loader icon template.
     * @param {Object} context - Icon options.
     */
    loadericon(context: {
        /**
         * Options.
         */
        options: ScrollerLoaderIconOptions;
    }): TemplateRef<{ options: ScrollerLoaderIconOptions }>;
}
