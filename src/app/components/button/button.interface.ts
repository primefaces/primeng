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
    icon(): TemplateRef<any>;
    /**
     * Custom template of loadingicon.
    */
    loadingicon(): TemplateRef<any>;
}
