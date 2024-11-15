/**
 *
 * BlockUI Design Tokens
 *
 * [Live Demo](https://www.primeng.org/blockui/)
 *
 * @module themes/blockui
 *
 */
import { DesignTokens } from '..';

export interface BlockUIDesignTokens extends DesignTokens<BlockUIDesignTokens> {
    /**
     * Used to pass tokens of the root section
     */
    root?: {
        /**
         * Border radius of root
         *
         * @designToken blockui.border.radius
         */
        borderRadius?: string;
    };
}
