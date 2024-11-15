/**
 *
 * InputOTP Design Tokens
 *
 * [Live Demo](https://www.primeng.org/inputotp/)
 *
 * @module themes/inputotp
 *
 */
import { DesignTokens } from '..';

export interface InputOtpDesignTokens extends DesignTokens<InputOtpDesignTokens> {
    /**
     * Used to pass tokens of the root section
     */
    root?: {
        /**
         * Gap of root
         *
         * @designToken inputotp.gap
         */
        gap?: string;
    };
    /**
     * Used to pass tokens of the input section
     */
    input?: {
        /**
         * Width of input
         *
         * @designToken inputotp.input.width
         */
        width?: string;
        /**
         * Used to pass tokens of the input section for small screens.
         */
        sm?: {
            /**
             * Width of input in small screens
             *
             * @designToken inputotp.input.sm.width
             */
            width?: string;
        };
        /**
         * Used to pass tokens of the input section for small screens.
         */
        lg?: {
            /**
             * Width of input in large screens
             *
             * @designToken inputotp.input.lg.width
             */
            width?: string;
        };
    };
}
