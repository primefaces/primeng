/**
 *
 * Textarea Design Tokens
 *
 * [Live Demo](https://www.primeng.org/textarea/)
 *
 * @module themes/textarea
 *
 */
import { DesignTokens } from '..';

export interface TextareaDesignTokens extends DesignTokens<TextareaDesignTokens> {
    /**
     * Used to pass tokens of the root section
     */
    root?: {
        /**
         * Background of root
         *
         * @designToken textarea.background
         */
        background?: string;
        /**
         * Disabled background of root
         *
         * @designToken textarea.disabled.background
         */
        disabledBackground?: string;
        /**
         * Filled background of root
         *
         * @designToken textarea.filled.background
         */
        filledBackground?: string;
        /**
         * Filled focus background of root
         *
         * @designToken textarea.filled.focus.background
         */
        filledFocusBackground?: string;
        /**
         * Border color of root
         *
         * @designToken textarea.border.color
         */
        borderColor?: string;
        /**
         * Hover border color of root
         *
         * @designToken textarea.hover.border.color
         */
        hoverBorderColor?: string;
        /**
         * Focus border color of root
         *
         * @designToken textarea.focus.border.color
         */
        focusBorderColor?: string;
        /**
         * Invalid border color of root
         *
         * @designToken textarea.invalid.border.color
         */
        invalidBorderColor?: string;
        /**
         * Color of root
         *
         * @designToken textarea.color
         */
        color?: string;
        /**
         * Disabled color of root
         *
         * @designToken textarea.disabled.color
         */
        disabledColor?: string;
        /**
         * Placeholder color of root
         *
         * @designToken textarea.placeholder.color
         */
        placeholderColor?: string;
        /**
         * Invalid placeholder color of root
         *
         * @designToken textarea.invalid.placeholder.color
         */
        invalidPlaceholderColor?: string;
        /**
         * Shadow of root
         *
         * @designToken textarea.shadow
         */
        shadow?: string;
        /**
         * Padding x of root
         *
         * @designToken textarea.padding.x
         */
        paddingX?: string;
        /**
         * Padding y of root
         *
         * @designToken textarea.padding.y
         */
        paddingY?: string;
        /**
         * Border radius of root
         *
         * @designToken textarea.border.radius
         */
        borderRadius?: string;
        /**
         * Focus ring of root
         */
        focusRing?: {
            /**
             * Focus ring width of root
             *
             * @designToken textarea.focus.ring.width
             */
            width?: string;
            /**
             * Focus ring style of root
             *
             * @designToken textarea.focus.ring.style
             */
            style?: string;
            /**
             * Focus ring color of root
             *
             * @designToken textarea.focus.ring.color
             */
            color?: string;
            /**
             * Focus ring offset of root
             *
             * @designToken textarea.focus.ring.offset
             */
            offset?: string;
            /**
             * Focus ring shadow of root
             *
             * @designToken textarea.focus.ring.shadow
             */
            shadow?: string;
        };
        /**
         * Transition duration of root
         *
         * @designToken textarea.transition.duration
         */
        transitionDuration?: string;
        /**
         * Sm of root
         */
        sm?: {
            /**
             * Sm font size of root
             *
             * @designToken textarea.sm.font.size
             */
            fontSize?: string;
            /**
             * Sm padding x of root
             *
             * @designToken textarea.sm.padding.x
             */
            paddingX?: string;
            /**
             * Sm padding y of root
             *
             * @designToken textarea.sm.padding.y
             */
            paddingY?: string;
        };
        /**
         * Lg of root
         */
        lg?: {
            /**
             * Lg font size of root
             *
             * @designToken textarea.lg.font.size
             */
            fontSize?: string;
            /**
             * Lg padding x of root
             *
             * @designToken textarea.lg.padding.x
             */
            paddingX?: string;
            /**
             * Lg padding y of root
             *
             * @designToken textarea.lg.padding.y
             */
            paddingY?: string;
        };
    };
}
