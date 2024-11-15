/**
 *
 * Skeleton Design Tokens
 *
 * [Live Demo](https://www.primeng.org/skeleton/)
 *
 * @module themes/skeleton
 *
 */
import { DesignTokens } from '..';

export interface SkeletonDesignTokens extends DesignTokens<SkeletonDesignTokens> {
    /**
     * Used to pass tokens of the root section
     */
    root?: {
        /**
         * Border radius of root
         *
         * @designToken skeleton.border.radius
         */
        borderRadius?: string;
        /**
         * Background of root
         *
         * @designToken skeleton.background
         */
        background?: string;
        /**
         * Animation background of root
         *
         * @designToken skeleton.animation.background
         */
        animationBackground?: string;
    };
}
