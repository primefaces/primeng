/**
 *
 * VirtualScroller Design Tokens
 *
 * [Live Demo](https://www.primeng.org/virtualscroller/)
 *
 * @module themes/scroller
 *
 */
import { DesignTokens } from '..';

export interface VirtualScrollerDesignTokens extends DesignTokens<VirtualScrollerDesignTokens> {
    /**
     * Used to pass tokens of the loader section
     */
    loader?: {
        /**
         * Used to pass tokens of the mask section
         */
        mask?: {
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
        icon?: {
            /**
             * Size of the loader icon
             *
             * @designToken virtualscroller.loader.icon.size
             */
            size?: string;
        };
    };
}
