/**
 *
 * ProgressSpinner Design Tokens
 *
 * [Live Demo](https://www.primeng.org/progressspinner/)
 *
 * @module themes/progressspinner
 *
 */
import { DesignTokens } from '..';

export interface ProgressSpinnerDesignTokens extends DesignTokens<ProgressSpinnerDesignTokens> {
    /**
     * Used to pass tokens of the root section
     */
    root?: {
        /**
         * Color.1 of root
         *
         * @designToken progressspinner.color.1
         */
        colorOne?: string;
        /**
         * Color.2 of root
         *
         * @designToken progressspinner.color.2
         */
        colorTwo?: string;
        /**
         * Color.3 of root
         *
         * @designToken progressspinner.color.3
         */
        colorThree?: string;
        /**
         * Color.4 of root
         *
         * @designToken progressspinner.color.4
         */
        colorFour?: string;
    };
}
