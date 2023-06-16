import { TemplateRef } from '@angular/core';

/**
 * Defines valid templates in Inplace.
 * @group Templates
 */
export interface InplaceTemplates {
    /**
     * Custom template of display.
     */
    display(): TemplateRef<any>;
    /**
     * Custom template of content.
     */
    content(): TemplateRef<any>;
    /**
     * Custom template of close icon.
     */
    closeicon(): TemplateRef<any>;
}
