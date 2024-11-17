/**
 *
 * Toolbar Design Tokens
 *
 * [Live Demo](https://www.primeng.org/toolbar/)
 *
 * @module themes/toolbar
 *
 */
import { DesignTokens } from '..';

export interface ToolbarDesignTokens extends DesignTokens<ToolbarDesignTokens> {
    /**
     * Used to pass tokens of the root section
     */
    root?: {
        /**
         * Background of root
         *
         * @designToken toolbar.background
         */
        background?: string;
        /**
         * Border color of root
         *
         * @designToken toolbar.border.color
         */
        borderColor?: string;
        /**
         * Border radius of root
         *
         * @designToken toolbar.border.radius
         */
        borderRadius?: string;
        /**
         * Color of root
         *
         * @designToken toolbar.color
         */
        color?: string;
        /**
         * Gap of root
         *
         * @designToken toolbar.gap
         */
        gap?: string;
        /**
         * Padding of root
         *
         * @designToken toolbar.padding
         */
        padding?: string;
    };
}
