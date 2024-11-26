import { TemplateRef } from '@angular/core';
/**
 * Responsive options of the component.
 * @group Interface
 */
export interface GalleriaResponsiveOptions {
    /**
     * Breakpoint for responsive mode. Exp; @media screen and (max-width: ${breakpoint}) {...}
     */
    breakpoint: string;
    /**
     * The number of visible items on breakpoint.
     */
    numVisible: number;
}
/**
 * Defines valid templates in Galleria.
 * @group Templates
 */
export interface GalleriaTemplates {
    /**
     * Custom template of header.
     */
    header(): TemplateRef<any>;
    /**
     * Custom template of footer.
     */
    footer(): TemplateRef<any>;
    /**
     * Custom template of indicator.
     * @param {Object} context - indicator data.
     */
    indicator(context: {
        /**
         * Index of the item.
         */
        $implicit: any;
    }): TemplateRef<{ $implicit: any }>;
    /**
     * Custom template of closeicon.
     */
    closeicon(): TemplateRef<any>;
    /**
     * Custom template of itemnexticon.
     */
    itemnexticon(): TemplateRef<any>;
    /**
     * Custom template of itempreviousicon.
     */
    itempreviousicon(): TemplateRef<any>;
    /**
     * Custom template of previousthumbnailicon.
     */
    previousthumbnailicon(): TemplateRef<any>;
    /**
     * Custom template of nextthumbnailicon.
     */
    nextthumbnailicon(): TemplateRef<any>;
    /**
     * Custom template of caption.
     * @param {Object} context - item data.
     */
    caption(context: {
        /**
         * Item instance.
         */
        $implicit: any;
    }): TemplateRef<{ $implicit: any }>;
    /**
     * Custom template of thumbnail.
     * @param {Object} context - item data.
     */
    thumbnail(context: {
        /**
         * Item instance.
         */
        $implicit: any;
    }): TemplateRef<{ $implicit: any }>;
    /**
     * Custom template of item.
     * @param {Object} context - item data.
     */
    item(context: {
        /**
         * Item instance.
         */
        $implicit: any;
    }): TemplateRef<{ $implicit: any }>;
}
