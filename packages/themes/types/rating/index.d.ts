/**
 *
 * Rating Design Tokens
 *
 * [Live Demo](https://www.primeng.org/rating/)
 *
 * @module themes/rating
 *
 */
import { DesignTokens } from '..';

export interface RatingDesignTokens extends DesignTokens<RatingDesignTokens> {
    /**
     * Used to pass tokens of the root section
     */
    root?: {
        /**
         * Gap of root
         *
         * @designToken rating.gap
         */
        gap?: string;
        /**
         * Transition duration of root
         *
         * @designToken rating.transition.duration
         */
        transitionDuration?: string;
        /**
         * Focus ring of root
         */
        focusRing?: {
            /**
             * Focus ring width of root
             *
             * @designToken rating.focus.ring.width
             */
            width?: string;
            /**
             * Focus ring style of root
             *
             * @designToken rating.focus.ring.style
             */
            style?: string;
            /**
             * Focus ring color of root
             *
             * @designToken rating.focus.ring.color
             */
            color?: string;
            /**
             * Focus ring offset of root
             *
             * @designToken rating.focus.ring.offset
             */
            offset?: string;
            /**
             * Focus ring shadow of root
             *
             * @designToken rating.focus.ring.shadow
             */
            shadow?: string;
        };
    };
    /**
     * Used to pass tokens of the icon section
     */
    icon?: {
        /**
         * Size of icon
         *
         * @designToken rating.icon.size
         */
        size?: string;
        /**
         * Color of icon
         *
         * @designToken rating.icon.color
         */
        color?: string;
        /**
         * Hover color of icon
         *
         * @designToken rating.icon.hover.color
         */
        hoverColor?: string;
        /**
         * Active color of icon
         *
         * @designToken rating.icon.active.color
         */
        activeColor?: string;
    };
}
