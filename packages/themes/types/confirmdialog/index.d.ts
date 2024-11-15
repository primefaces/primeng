/**
 *
 * ConfirmDialog Design Tokens
 *
 * [Live Demo](https://www.primeng.org/confirmdialog/)
 *
 * @module themes/confirmdialog
 *
 */
import { DesignTokens } from '..';

export interface ConfirmDialogDesignTokens extends DesignTokens<ConfirmDialogDesignTokens> {
    /**
     * Used to pass tokens of the icon section
     */
    icon?: {
        /**
         * Size of icon
         *
         * @designToken confirmdialog.icon.size
         */
        size?: string;
        /**
         * Color of icon
         *
         * @designToken confirmdialog.icon.color
         */
        color?: string;
    };
    /**
     * Used to pass tokens of the content section
     */
    content?: {
        /**
         * Gap of content
         *
         * @designToken confirmdialog.content.gap
         */
        gap?: string;
    };
}
