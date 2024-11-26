/**
 *
 * InputGroup Design Tokens
 *
 * [Live Demo](https://www.primeng.org/inputgroup/)
 *
 * @module themes/inputgroup
 *
 */
import { DesignTokens } from '..';

export interface InputGroupDesignTokens extends DesignTokens<InputGroupDesignTokens> {
    /**
     * Used to pass tokens of the addon section
     */
    addon?: {
        /**
         * Background of addon
         *
         * @designToken inputgroup.addon.background
         */
        background?: string;
        /**
         * Border color of addon
         *
         * @designToken inputgroup.addon.border.color
         */
        borderColor?: string;
        /**
         * Color of addon
         *
         * @designToken inputgroup.addon.color
         */
        color?: string;
        /**
         * Border radius of addon
         *
         * @designToken inputgroup.addon.border.radius
         */
        borderRadius?: string;
        /**
         * Padding of addon
         *
         * @designToken inputgroup.addon.padding
         */
        padding?: string;
        /**
         * Min width of addon
         *
         * @designToken inputgroup.addon.min.width
         */
        minWidth?: string;
    };
}
