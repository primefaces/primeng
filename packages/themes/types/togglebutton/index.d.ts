/**
 *
 * ToggleButton Design Tokens
 *
 * [Live Demo](https://www.primeng.org/togglebutton/)
 *
 * @module themes/togglebutton
 *
 */
import { DesignTokens } from '..';

export interface ToggleButtonDesignTokens extends DesignTokens<ToggleButtonDesignTokens> {
    /**
     * Used to pass tokens of the root section
     */
    root?: {
        /**
         * Padding of root
         *
         * @designToken togglebutton.padding
         */
        padding?: string;
        /**
         * Border radius of root
         *
         * @designToken togglebutton.border.radius
         */
        borderRadius?: string;
        /**
         * Gap of root
         *
         * @designToken togglebutton.gap
         */
        gap?: string;
        /**
         * Font weight of root
         *
         * @designToken togglebutton.font.weight
         */
        fontWeight?: string;
        /**
         * Disabled background of root
         *
         * @designToken togglebutton.disabled.background
         */
        disabledBackground?: string;
        /**
         * Disabled border color of root
         *
         * @designToken togglebutton.disabled.border.color
         */
        disabledBorderColor?: string;
        /**
         * Disabled color of root
         *
         * @designToken togglebutton.disabled.color
         */
        disabledColor?: string;
        /**
         * Invalid border color of root
         *
         * @designToken togglebutton.invalid.border.color
         */
        invalidBorderColor?: string;
        /**
         * Focus ring of root
         */
        focusRing?: {
            /**
             * Focus ring width of root
             *
             * @designToken togglebutton.focus.ring.width
             */
            width?: string;
            /**
             * Focus ring style of root
             *
             * @designToken togglebutton.focus.ring.style
             */
            style?: string;
            /**
             * Focus ring color of root
             *
             * @designToken togglebutton.focus.ring.color
             */
            color?: string;
            /**
             * Focus ring offset of root
             *
             * @designToken togglebutton.focus.ring.offset
             */
            offset?: string;
            /**
             * Focus ring shadow of root
             *
             * @designToken togglebutton.focus.ring.shadow
             */
            shadow?: string;
        };
        /**
         * Transition duration of root
         *
         * @designToken togglebutton.transition.duration
         */
        transitionDuration?: string;
        /**
         * Sm of root
         */
        sm?: {
            /**
             * Sm font size of root
             *
             * @designToken togglebutton.sm.font.size
             */
            fontSize?: string;
            /**
             * Sm padding of root
             *
             * @designToken togglebutton.sm.padding
             */
            padding?: string;
        };
        /**
         * Lg of root
         */
        lg?: {
            /**
             * Lg font size of root
             *
             * @designToken togglebutton.lg.font.size
             */
            fontSize?: string;
            /**
             * Lg padding of root
             *
             * @designToken togglebutton.lg.padding
             */
            padding?: string;
        };
        /**
         * Background of root
         *
         * @designToken togglebutton.background
         */
        background?: string;
        /**
         * Checked background of root
         *
         * @designToken togglebutton.checked.background
         */
        checkedBackground?: string;
        /**
         * Hover background of root
         *
         * @designToken togglebutton.hover.background
         */
        hoverBackground?: string;
        /**
         * Border color of root
         *
         * @designToken togglebutton.border.color
         */
        borderColor?: string;
        /**
         * Color of root
         *
         * @designToken togglebutton.color
         */
        color?: string;
        /**
         * Hover color of root
         *
         * @designToken togglebutton.hover.color
         */
        hoverColor?: string;
        /**
         * Checked color of root
         *
         * @designToken togglebutton.checked.color
         */
        checkedColor?: string;
        /**
         * Checked border color of root
         *
         * @designToken togglebutton.checked.border.color
         */
        checkedBorderColor?: string;
    };
    /**
     * Used to pass tokens of the icon section
     */
    icon?: {
        /**
         * Disabled color of icon
         *
         * @designToken togglebutton.icon.disabled.color
         */
        disabledColor?: string;
        /**
         * Color of icon
         *
         * @designToken togglebutton.icon.color
         */
        color?: string;
        /**
         * Hover color of icon
         *
         * @designToken togglebutton.icon.hover.color
         */
        hoverColor?: string;
        /**
         * Checked color of icon
         *
         * @designToken togglebutton.icon.checked.color
         */
        checkedColor?: string;
    };
    /**
     * Used to pass tokens of the content section
     */
    content?: {
        /**
         * Padding of the content
         *
         * @designToken togglebutton.content.padding
         */
        padding?: string;
        /**
         * Border radius of the content
         *
         * @designToken togglebutton.border.radius
         */
        borderRadius?: string;
        /**
         * Checked shadow of content
         *
         * @designToken togglebutton.content.checked.shadow
         */
        checkedShadow?: string;
        /**
         * Checked background of content
         *
         * @designToken togglebutton.content.checked.background
         */
        checkedBackground?: string;
        /**
         * Sm of content
         */
        sm?: {
            /**
             * Sm padding of content
             *
             * @designToken togglebutton.content.sm.padding
             */
            padding?: string;
        };
        /**
         * Lg of root
         */
        lg?: {
            /**
             * Lg padding of content
             *
             * @designToken togglebutton.content.lg.padding
             */
            padding?: string;
        };
    };
}
