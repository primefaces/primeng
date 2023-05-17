import { TemplateRef } from '@angular/core';

export interface CarouselResponsiveOptions {
    /**
     * Breakpoint for responsive mode. Exp; @media screen and (max-width: ${breakpoint}) {...}
     */
    breakpoint: string;
    /**
     * The number of visible items on breakpoint.
     */
    numVisible: number;
    /**
     * The number of scrolled items on breakpoint.
     */
    numScroll: number;
}

/**
 * Defines valid templates in Carousel.
 * @group Templates
 */
export interface CarouselTemplates {
    /**
     * Custom template of header.
     */
    header: TemplateRef<any> | null;
    /**
     * Custom template of item.
     */
    item(context: {
        /**
         * Data of the item.
         */
        $implicit: any;
    }): TemplateRef<{ $implicit: any }>;
    /**
     * Custom template of previousicon.
     */
    previousicon: TemplateRef<any> | null;
    /**
     * Custom template of nexticon.
     */
    nexticon: TemplateRef<any> | null;
    /**
     * Custom template of footer.
     */
    footer: TemplateRef<any> | null;
}
