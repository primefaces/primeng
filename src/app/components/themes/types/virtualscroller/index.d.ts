/**
 *
 * VirtualScroller Design Tokens
 *
 * [Live Demo](https://www.primeng.org/virtualscroller/)
 *
 * @module themes/scroller
 *
 */

import { ColorSchemeDesignToken } from '..';

export interface VirtualScrollerDesignTokens extends ColorSchemeDesignToken<VirtualScrollerDesignTokens> {
    /**
     * Used to pass tokens of the mask section
     */
    loaderMask?: {
        /**
         * Background of loader mask
         *
         * @designToken virtualscroller.loader.mask.background
         */
        background?: string;
        /**
         * Color of loader mask
         *
         * @designToken virtualscroller.loader.mask.color
         */
        color?: string;
    };
    /**
     * Used to pass tokens of the loader icon section
     */
    loaderIcon?: {
        /**
         * Size of the loader icon
         *
         * @designToken virtualscroller.loader.icon.size
         */
        size?: string;
    };
}
