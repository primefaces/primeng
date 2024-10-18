/**
 *
 * Card Design Tokens
 *
 * [Live Demo](https://www.primeng.org/card/)
 *
 * @module themes/card
 *
 */

import { ColorSchemeDesignToken } from '..';

export interface CardDesignTokens extends ColorSchemeDesignToken<CardDesignTokens> {
    /**
     * Used to pass tokens of the root section
     */
    root?: {
        /**
         * Background of root
         *
         * @designToken card.background
         */
        background?: string;
        /**
         * Border radius of root
         *
         * @designToken card.border.radius
         */
        borderRadius?: string;
        /**
         * Color of root
         *
         * @designToken card.color
         */
        color?: string;
        /**
         * Shadow of root
         *
         * @designToken card.shadow
         */
        shadow?: string;
    };
    /**
     * Used to pass tokens of the caption section
     */
    caption?: {
        /**
         * Gap of caption
         *
         * @designToken card.caption.gap
         */
        gap?: string;
    };
    /**
     * Used to pass tokens of the body section
     */
    body?: {
        /**
         * Padding of body
         *
         * @designToken card.body.padding
         */
        padding?: string;
        /**
         * Gap of body
         *
         * @designToken card.body.gap
         */
        gap?: string;
    };
    /**
     * Used to pass tokens of the content section
     */
    content?: {
        /**
         * Padding of content
         *
         * @designToken card.content.padding
         */
        padding?: string;
        /**
         * Gap of content
         *
         * @designToken card.content.gap
         */
        gap?: string;
    };
    /**
     * Used to pass tokens of the footer section
     */
    footer?: {
        /**
         * Padding of footer
         *
         * @designToken card.footer.padding
         */
        padding?: string;
    };
    /**
     * Used to pass tokens of the title section
     */
    title?: {
        /**
         * Padding of title
         *
         * @designToken card.title.padding
         */
        padding?: string;
        /**
         * Font size of title
         *
         * @designToken card.title.font.size
         */
        fontSize?: string;
        /**
         * Font weight of title
         *
         * @designToken card.title.font.weight
         */
        fontWeight?: string;
        /**
         * Color of title
         *
         * @designToken card.title.color
         */
        color?: string;
    };
    /**
     * Used to pass tokens of the subtitle section
     */
    subtitle?: {
        /**
         * Padding of subtitle
         *
         * @designToken card.subtitle.padding
         */
        padding?: string;
        /**
         * Font size of subtitle
         *
         * @designToken card.subtitle.font.size
         */
        fontSize?: string;
        /**
         * Font weight of subtitle
         *
         * @designToken card.subtitle.font.weight
         */
        fontWeight?: string;
        /**
         * Color of subtitle
         *
         * @designToken card.subtitle.color
         */
        color?: string;
    };
}
