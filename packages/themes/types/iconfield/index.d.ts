/**
 *
 * IconField Design Tokens
 *
 * [Live Demo](https://www.primeng.org/iconfield/)
 *
 * @module themes/iconfield
 *
 */
import { DesignTokens } from '..';

export interface IconFieldDesignTokens extends DesignTokens<IconFieldDesignTokens> {
    /**
     * Used to pass tokens of the icon section
     */
    icon?: {
        /**
         * Color of icon
         *
         * @designToken iconfield.icon.color
         */
        color?: string;
    };
}
