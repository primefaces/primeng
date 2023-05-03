/**
 *
 * Card is a flexible container component.
 *
 * [Live Demo](https://www.primeng.org/card/)
 *
 * @module card
 *
 */

import { TemplateRef } from "@angular/core";

export declare type CardPassThroughOptionType = CardPassThroughAttributes | null | undefined;

export interface CardTemplates {
    /**
     * Custom template of header.
     */
    headerTemplate: TemplateRef<any>
    /**
     * Custom template of title.
     */
    titleTemplate: TemplateRef<any>;
    /**
     * Custom template of subtitle.
     */
    subtitleTemplate: TemplateRef<any>;
    /**
     * Custom template of content.
     */
    contentTemplate: TemplateRef<any>;
    /**
     * Custom template of footer.
     */
    footerTemplate: TemplateRef<any>;
}

export interface CardPassThroughAttributes {
    [key: string]: any;
}