/**
 *
 * OverlayBadge Design Tokens
 *
 * [Live Demo](https://www.primeng.org/overlaybadge/)
 *
 * @module themes/overlaybadge
 *
 */
import { DesignTokens } from '..';

export interface OverlayBadgeDesignTokens extends DesignTokens<OverlayBadgeDesignTokens> {
    /**
     * Used to pass tokens of the root section
     */
    root?: {
        /**
         * Outline of root
         */
        outline?: {
            /**
             * Outline width of root
             *
             * @designToken overlaybadge.outline.width
             */
            width?: string;
            /**
             * Outline color of root
             *
             * @designToken overlaybadge.outline.color
             */
            color?: string;
        };
    };
}
