/**
 *
 * SelectButton Design Tokens
 *
 * [Live Demo](https://www.primeng.org/selectbutton/)
 *
 * @module themes/selectbutton
 *
 */
import { DesignTokens } from '..';

export interface SelectButtonDesignTokens extends DesignTokens<SelectButtonDesignTokens> {
    /**
     * Used to pass tokens of the root section
     */
    root?: {
        /**
         * Border radius of root
         *
         * @designToken selectbutton.border.radius
         */
        borderRadius?: string;
        /**
         * Invalid border color of root
         *
         * @designToken selectbutton.invalid.border.color
         */
        invalidBorderColor?: string;
    };
}
