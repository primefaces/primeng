/**
 *
 * SplitButton Design Tokens
 *
 * [Live Demo](https://www.primeng.org/splitbutton/)
 *
 * @module themes/splitbutton
 *
 */
import { DesignTokens } from '..';

export interface SplitButtonDesignTokens extends DesignTokens<SplitButtonDesignTokens> {
    /**
     * Used to pass tokens of the root section
     */
    root?: {
        /**
         * Border radius of root
         *
         * @designToken splitbutton.border.radius
         */
        borderRadius?: string;
        /**
         * Rounded border radius of root
         *
         * @designToken splitbutton.rounded.border.radius
         */
        roundedBorderRadius?: string;
        /**
         * Raised shadow of root
         *
         * @designToken splitbutton.raised.shadow
         */
        raisedShadow?: string;
    };
}
