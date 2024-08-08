import { NgClass } from '@angular/common';
import { TemplateRef } from '@angular/core';

/**
 * Defines valid templates in Button.
 * @group Templates
 */
export interface ButtonTemplates {
    /**
     * Custom template of content.
     */
    content(): TemplateRef<any>;
    /**
     * Custom template of icon.
     */
    icon(context: {
        /**
         * Icon class.
         */
        class: NgClass;
    }): TemplateRef<NgClass>;
    /**
     * Custom template of loadingicon.
     */
    loadingicon(context: {
        /**
         * Icon class.
         */
        class: NgClass;
    }): TemplateRef<NgClass>;
}
