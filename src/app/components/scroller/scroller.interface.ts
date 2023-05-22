import { TemplateRef } from '@angular/core';
import { Scroller } from './scroller';

export type ScrollerToType = 'to-start' | 'to-end' | undefined;

export type ScrollerOrientationType = 'vertical' | 'horizontal' | 'both';
/**
 * Options for the virtual scroller.
 */
export interface ScrollerOptions {
    id?: string | undefined;
    style?: any;
    styleClass?: string | undefined;
    tabindex?: number | undefined;
    items?: any[];
    itemSize?: any;
    scrollHeight?: string | undefined;
    scrollWidth?: string | undefined;
    orientation?: ScrollerOrientationType;
    step?: number | undefined;
    delay?: number | undefined;
    resizeDelay?: number | undefined;
    appendOnly?: boolean;
    inline?: boolean;
    lazy?: boolean;
    disabled?: boolean;
    loaderDisabled?: boolean;
    columns?: any[] | undefined;
    showSpacer?: boolean;
    showLoader?: boolean;
    numToleratedItems?: any;
    loading?: boolean;
    autoSize?: boolean;
    trackBy?: any;
    onLazyLoad?: Function | undefined;
    onScroll?: Function | undefined;
    onScrollIndexChange?: Function | undefined;
}
/**
 * Loader icon options.
 */
export interface ScrollerLoaderIconOptions {
    [klass: string]: any;
}
/**
 * Scroller content options.
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
 */
export interface ScrollerItemOptions {
    index?: number;
    count?: number;
    first?: boolean;
    last?: boolean;
    even?: boolean;
    odd?: boolean;
}
/**
 * Loader settings.
 * @extends {ScrollerItemOptions}
 */
export interface ScrollerLoaderOptions extends ScrollerItemOptions {
    [klass: string]: any;
}
/**
 * Custom lazy load event.
 * @see {@link Scroller.onLazyLoad}
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
 */
export interface ScrollerScrollIndexChangeEvent extends ScrollerLazyLoadEvent {}
/**
 * Custom scroll event.
 * @see {@link Scroller.onScroll}
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
     */
    loader(context: { options: ScrollerLoaderOptions }): TemplateRef<{ options: ScrollerLoaderOptions }>;
    /**
     * Custom loader icon template.
     */
    loadericon(context: { options: ScrollerLoaderIconOptions }): TemplateRef<{ options: ScrollerLoaderIconOptions }>;
}
