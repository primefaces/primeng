/**
 *
 * SpeedDial Design Tokens
 *
 * [Live Demo](https://www.primeng.org/speeddial/)
 *
 * @module themes/speeddial
 *
 */
import { DesignTokens } from '..';

export interface SpeedDialDesignTokens extends DesignTokens<SpeedDialDesignTokens> {
    /**
     * Used to pass tokens of the root section
     */
    root?: {
        /**
         * Gap of root
         *
         * @designToken speeddial.gap
         */
        gap?: string;
        /**
         * Transition duration of root
         *
         * @designToken speeddial.transition.duration
         */
        transitionDuration?: string;
    };
}
