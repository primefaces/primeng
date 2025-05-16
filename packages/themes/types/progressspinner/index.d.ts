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
         * Color one of root
         *
         * @designToken progressspinner.color.one
         */
        colorOne?: string;
        /**
         * Color two of root
         *
         * @designToken progressspinner.color.two
         */
        colorTwo?: string;
        /**
         * Color three of root
         *
         * @designToken progressspinner.color.three
         */
        colorThree?: string;
        /**
         * Color four of root
         *
         * @designToken progressspinner.color.four
         */
        colorFour?: string;
    };
}
