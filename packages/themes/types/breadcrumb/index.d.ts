/**
 *
 * Breadcrumb Design Tokens
 *
 * [Live Demo](https://www.primeng.org/breadcrumb/)
 *
 * @module themes/breadcrumb
 *
 */
import { DesignTokens } from '..';

export interface BreadcrumbDesignTokens extends DesignTokens<BreadcrumbDesignTokens> {
    /**
     * Used to pass tokens of the root section
     */
    root?: {
        /**
         * Padding of root
         *
         * @designToken breadcrumb.padding
         */
        padding?: string;
        /**
         * Background of root
         *
         * @designToken breadcrumb.background
         */
        background?: string;
        /**
         * Gap of root
         *
         * @designToken breadcrumb.gap
         */
        gap?: string;
        /**
         * Transition duration of root
         *
         * @designToken breadcrumb.transition.duration
         */
        transitionDuration?: string;
    };
    /**
     * Used to pass tokens of the item section
     */
    item?: {
        /**
         * Color of item
         *
         * @designToken breadcrumb.item.color
         */
        color?: string;
        /**
         * Hover color of item
         *
         * @designToken breadcrumb.item.hover.color
         */
        hoverColor?: string;
        /**
         * Border radius of item
         *
         * @designToken breadcrumb.item.border.radius
         */
        borderRadius?: string;
        /**
         * Gap of item
         *
         * @designToken breadcrumb.item.gap
         */
        gap?: string;
        /**
         * Icon of item
         */
        icon?: {
            /**
             * Icon color of item
             *
             * @designToken breadcrumb.item.icon.color
             */
            color?: string;
            /**
             * Icon hover color of item
             *
             * @designToken breadcrumb.item.icon.hover.color
             */
            hoverColor?: string;
        };
        /**
         * Focus ring of item
         */
        focusRing?: {
            /**
             * Focus ring width of item
             *
             * @designToken breadcrumb.item.focus.ring.width
             */
            width?: string;
            /**
             * Focus ring style of item
             *
             * @designToken breadcrumb.item.focus.ring.style
             */
            style?: string;
            /**
             * Focus ring color of item
             *
             * @designToken breadcrumb.item.focus.ring.color
             */
            color?: string;
            /**
             * Focus ring offset of item
             *
             * @designToken breadcrumb.item.focus.ring.offset
             */
            offset?: string;
            /**
             * Focus ring shadow of item
             *
             * @designToken breadcrumb.item.focus.ring.shadow
             */
            shadow?: string;
        };
    };
    /**
     * Used to pass tokens of the separator section
     */
    separator?: {
        /**
         * Color of separator
         *
         * @designToken breadcrumb.separator.color
         */
        color?: string;
    };
}
